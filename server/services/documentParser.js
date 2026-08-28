import pdf from 'pdf-parse';

export const parsePdfBuffer = async (pdfBuffer) => {
  try {
    const data = await pdf(pdfBuffer);
    const rawText = data.text || '';
    const numPages = data.numpages || 1;

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
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error('Failed to parse PDF document: ' + error.message);
  }
};
