import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportExecutiveReportToPdf = async (containerElement, productName = 'Procurement-Analysis') => {
  if (!containerElement) {
    throw new Error('Report container element not found.');
  }

  // Find all .pdf-page elements
  const pages = containerElement.querySelectorAll('.pdf-page');
  if (!pages || pages.length === 0) {
    throw new Error('No PDF pages found in report container.');
  }

  // A4 dimensions in mm
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = 210;
  const pdfHeight = 297;

  for (let i = 0; i < pages.length; i++) {
    const pageElem = pages[i];
    
    // High-resolution canvas rendering
    const canvas = await html2canvas(pageElem, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    if (i > 0) {
      pdf.addPage('a4', 'p');
    }

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  }

  const cleanName = productName.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 25);
  pdf.save(`BIS_Procurement_Report_${cleanName}.pdf`);
  return true;
};
