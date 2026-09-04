import pdf from 'pdf-parse';
import zlib from 'zlib';

/**
 * Decode ASCII85 stream if present in PDF
 */
function decodeAscii85(str) {
  let clean = str.replace(/\s+/g, '').replace(/^<~/, '').replace(/~>$/, '');
  let out = [];
  for (let i = 0; i < clean.length; ) {
    if (clean[i] === 'z') {
      out.push(0, 0, 0, 0);
      i++;
      continue;
    }
    let chunk = clean.slice(i, i + 5);
    let pad = 5 - chunk.length;
    while (chunk.length < 5) chunk += 'u';
    let val = 0;
    for (let j = 0; j < 5; j++) {
      val = val * 85 + (chunk.charCodeAt(j) - 33);
    }
    let b = [
      (val >>> 24) & 0xff,
      (val >>> 16) & 0xff,
      (val >>> 8) & 0xff,
      val & 0xff
    ];
    for (let k = 0; k < 4 - pad; k++) {
      out.push(b[k]);
    }
    i += 5 - pad;
  }
  return Buffer.from(out);
}

/**
 * Direct PDF stream extractor for ReportLab, broken xref, or non-standard PDFs
 * where pdf-parse throws 'Command token too long' or 'bad XRef entry'
 */
function extractTextFromPdfStreams(pdfBuffer) {
  try {
    const content = pdfBuffer.toString('latin1');
    let fullText = '';

    // Match all streams regardless of newline formatting
    const streamRegex = /stream\r?\n([\s\S]*?)endstream/g;
    let match;

    while ((match = streamRegex.exec(content)) !== null) {
      const rawStream = match[1];
      let decoded = '';

      const streamStart = match.index + match[0].indexOf(rawStream);
      const streamBuffer = pdfBuffer.subarray(streamStart, streamStart + rawStream.length);

      // Try FlateDecode directly
      try {
        decoded = zlib.inflateSync(streamBuffer).toString('utf-8');
      } catch (e1) {
        try {
          // Try ASCII85 + FlateDecode (ReportLab default)
          const a85 = decodeAscii85(rawStream.trim());
          decoded = zlib.inflateSync(a85).toString('utf-8');
        } catch (e2) {
          decoded = rawStream;
        }
      }

      if (decoded) {
        // PDF text operators: (Text) Tj
        const tjRegex = /\(([\s\S]*?)\)\s*Tj/g;
        let tjMatch;
        while ((tjMatch = tjRegex.exec(decoded)) !== null) {
          let txt = tjMatch[1]
            .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
            .replace(/\\([\\()])/g, '$1')
            .replace(/\\r/g, '\r')
            .replace(/\\n/g, '\n');
          fullText += txt + '\n';
        }

        // PDF text arrays: [(Item 1) 12 (Item 2)] TJ
        const tjArrayRegex = /\[([\s\S]*?)\]\s*TJ/g;
        let arrayMatch;
        while ((arrayMatch = tjArrayRegex.exec(decoded)) !== null) {
          const inner = arrayMatch[1];
          const strRegex = /\(([\s\S]*?)\)/g;
          let sMatch;
          let line = '';
          while ((sMatch = strRegex.exec(inner)) !== null) {
            let txt = sMatch[1]
              .replace(/\\([0-7]{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
              .replace(/\\([\\()])/g, '$1');
            line += txt + ' ';
          }
          fullText += line + '\n';
        }
      }
    }

    // Fallback: extract plain text literals in the raw PDF body
    if (fullText.trim().length < 50) {
      const plainRegex = /\(([\s\S]*?)\)\s*Tj/g;
      let pm;
      while ((pm = plainRegex.exec(content)) !== null) {
        fullText += pm[1] + '\n';
      }
    }

    const pageMatches = content.match(/\/Type\s*\/Page\b/g);
    const numPages = pageMatches ? pageMatches.length : 1;

    return {
      text: fullText.trim(),
      numPages
    };
  } catch (err) {
    console.error('Fallback PDF stream extraction failed:', err);
    return null;
  }
}

export const parsePdfBuffer = async (pdfBuffer) => {
  let rawText = '';
  let numPages = 1;

  // Attempt 1: Standard pdf-parse engine
  try {
    const data = await pdf(pdfBuffer);
    rawText = data.text || '';
    numPages = data.numpages || 1;
  } catch (error) {
    console.warn(`Standard pdf-parse failed (${error.message}). Activating fallback stream extractor...`);
  }

  // Attempt 2: If standard parser failed or returned empty text, use robust stream extractor
  if (!rawText || rawText.trim().length < 30) {
    const fallbackResult = extractTextFromPdfStreams(pdfBuffer);
    if (fallbackResult && fallbackResult.text.trim().length >= 20) {
      rawText = fallbackResult.text;
      numPages = fallbackResult.numPages;
    }
  }

  if (!rawText || rawText.trim().length < 20) {
    throw new Error('Failed to parse PDF document: No readable text found. Please ensure the PDF is text-searchable.');
  }

  const cleanText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n\n')
    .trim();

  // Extract structured sections / clauses
  const lines = cleanText.split('\n');
  const structuredRequirements = [];
  let currentSection = 'General Specifications';

  const sectionRegex = /(?:section|clause|part|scope|technical specification|schedule of requirements|bill of quantities|compliance|testing|eligibility|parameters)[:\s\-0-9.]+/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line || line.length < 5) continue;

    if (sectionRegex.test(line) && line.length < 90) {
      currentSection = line.substring(0, 80);
    } else if (
      line.toLowerCase().includes('shall') ||
      line.toLowerCase().includes('must') ||
      line.toLowerCase().includes('is ') ||
      line.toLowerCase().includes('grade') ||
      line.toLowerCase().includes('watt') ||
      line.toLowerCase().includes('volt') ||
      line.toLowerCase().includes('protection') ||
      line.toLowerCase().includes('ip') ||
      line.toLowerCase().includes('test') ||
      line.toLowerCase().includes('standard') ||
      line.toLowerCase().includes('pump') ||
      line.toLowerCase().includes('specification')
    ) {
      if (structuredRequirements.length < 30) {
        structuredRequirements.push({
          section: currentSection,
          clause: `Item ${structuredRequirements.length + 1}`,
          extractedRequirement: line
        });
      }
    }
  }

  return {
    text: cleanText,
    numPages,
    structuredRequirements,
    totalLength: cleanText.length
  };
};

