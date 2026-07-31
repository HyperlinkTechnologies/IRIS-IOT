import { pdfTheme } from "./pdfTheme";

export function addParagraph(doc, text, y) {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(pdfTheme.fonts.body);
  doc.setTextColor(pdfTheme.colors.text);

  const lines = doc.splitTextToSize(
    text,
    pageWidth - pdfTheme.page.margin * 2
  );

  doc.text(lines, pdfTheme.page.margin, y);

  return y + lines.length * 6;
}

export function addHeading(doc, title, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(pdfTheme.fonts.h2);
  doc.setTextColor(pdfTheme.colors.secondary);

  doc.text(title, pdfTheme.page.margin, y);

  return y + 8;
}

export function addBulletList(doc, items, y) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(pdfTheme.fonts.body);

  items.forEach((item) => {
    doc.text(
      `• ${item}`,
      pdfTheme.page.margin + 4,
      y
    );

    y += 6;
  });

  return y;
}

export function addNote(doc, note, y) {
  if (!note) return y;

  const pageWidth = doc.internal.pageSize.getWidth();
  const width = pageWidth - pdfTheme.page.margin * 2;

  const lines = doc.splitTextToSize(
    note,
    width - 8
  );

  const height = lines.length * 6 + 8;

  doc.setFillColor(pdfTheme.colors.noteBackground);
  doc.setDrawColor(pdfTheme.colors.noteBorder);

  doc.roundedRect(
    pdfTheme.page.margin,
    y,
    width,
    height,
    2,
    2,
    "FD"
  );

  doc.setFont("helvetica", "bold");
  doc.text("Note", pdfTheme.page.margin + 4, y + 6);

  doc.setFont("helvetica", "normal");
  doc.text(lines, pdfTheme.page.margin + 4, y + 12);

  return y + height + 8;
}

export function addCodeBlock(doc, code, y) {
  if (!code) return y;

  const pageWidth = doc.internal.pageSize.getWidth();
  const width = pageWidth - pdfTheme.page.margin * 2;

  const lines = doc.splitTextToSize(
    code,
    width - 8
  );

  const height = lines.length * 5 + 8;

  doc.setFillColor(pdfTheme.colors.codeBackground);
  doc.setDrawColor(pdfTheme.colors.codeBorder);

  doc.roundedRect(
    pdfTheme.page.margin,
    y,
    width,
    height,
    2,
    2,
    "FD"
  );

  doc.setFont("courier", "normal");
  doc.setFontSize(pdfTheme.fonts.code);

  doc.text(lines, pdfTheme.page.margin + 4, y + 6);

  return y + height + 10;
}

export function ensurePage(doc, y, requiredHeight = 30) {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y + requiredHeight > pageHeight - pdfTheme.page.margin) {
    doc.addPage();
    return pdfTheme.page.margin;
  }

  return y;
}