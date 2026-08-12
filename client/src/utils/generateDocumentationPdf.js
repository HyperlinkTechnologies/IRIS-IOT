import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { documentationContent } from "../app/core/documentation/documentationContent";

import { pdfTheme } from "./pdfTheme";
import { addCoverPage } from "./pdfcoverPage";
import {
  addHeading,
  addParagraph,
  addBulletList,
  addNote,
  addCodeBlock,
  ensurePage,
} from "./pdfHelpers";

export function generateDocumentationPdf() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  //--------------------------------------------------
  // Metadata
  //--------------------------------------------------

  doc.setProperties({
    title: "IRIS IoT Platform User Manual",
    subject: "IRIS Documentation",
    author: "Hyperlink Technologies",
    creator: "IRIS IoT Platform",
    keywords: "IRIS IoT MQTT AWS Documentation",
  });

  //--------------------------------------------------
  // Cover
  //--------------------------------------------------

  addCoverPage(doc);

  //--------------------------------------------------
  // Table of Contents
  //--------------------------------------------------

  let y = pdfTheme.page.margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("Table of Contents", pdfTheme.page.margin, y);

  y += 14;

  const guides = Object.values(documentationContent);

  autoTable(doc, {
    startY: y,

    theme: "plain",

    styles: {
      fontSize: 11,
      cellPadding: 2,
    },

    head: [["Guide", "Topics"]],

    body: guides.map((guide) => [
      guide.title,
      guide.sections.length.toString(),
    ]),
  });

  doc.addPage();

  //--------------------------------------------------
  // Documentation
  //--------------------------------------------------

  guides.forEach((guide) => {
    y = pdfTheme.page.margin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(pdfTheme.fonts.h1);
    doc.setTextColor(pdfTheme.colors.primary);

    doc.text(
      guide.title,
      pdfTheme.page.margin,
      y
    );

    y += 12;

    guide.sections.forEach((section) => {
      y = ensurePage(doc, y, 45);

      //--------------------------------------
      // Heading
      //--------------------------------------

      y = addHeading(doc, section.heading, y);

      //--------------------------------------
      // Paragraphs
      //--------------------------------------

      if (section.paragraphs) {
        section.paragraphs.forEach((paragraph) => {
          y = ensurePage(doc, y, 25);

          y = addParagraph(
            doc,
            paragraph,
            y
          );

          y += 4;
        });
      }

      //--------------------------------------
      // Bullet List
      //--------------------------------------

      if (
        section.points &&
        section.points.length > 0
      ) {
        y = ensurePage(doc, y, 20);

        y = addBulletList(
          doc,
          section.points,
          y
        );

        y += 4;
      }

      //--------------------------------------
      // Note
      //--------------------------------------

      if (section.note) {
        y = ensurePage(doc, y, 35);

        y = addNote(
          doc,
          section.note,
          y
        );
      }

      //--------------------------------------
      // Code
      //--------------------------------------

      if (
        section.code &&
        section.code.trim() !== ""
      ) {
        y = ensurePage(doc, y, 45);

        y = addCodeBlock(
          doc,
          section.code,
          y
        );
      }

      y += 8;
    });

    doc.addPage();
  });

  //--------------------------------------------------
  // Remove blank last page
  //--------------------------------------------------

  const pageCount = doc.getNumberOfPages();

  if (
    doc.internal.getCurrentPageInfo().pageNumber ===
    pageCount
  ) {
    const last = doc.internal.pages[pageCount];

    if (
      last &&
      last.length <= 3 &&
      pageCount > 1
    ) {
      doc.deletePage(pageCount);
    }
  }

  //--------------------------------------------------
  // Footer
  //--------------------------------------------------

  const totalPages = doc.getNumberOfPages();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    const width =
      doc.internal.pageSize.getWidth();

    const height =
      doc.internal.pageSize.getHeight();

    doc.setDrawColor(220);

    doc.line(
      pdfTheme.page.margin,
      height - 12,
      width - pdfTheme.page.margin,
      height - 12
    );

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
      "IRIS IoT Platform User Manual",
      pdfTheme.page.margin,
      height - 6
    );

    doc.text(
      `Page ${i} of ${totalPages}`,
      width - pdfTheme.page.margin,
      height - 6,
      {
        align: "right",
      }
    );
  }

  //--------------------------------------------------
  // Download
  //--------------------------------------------------

  doc.save(`IRIS_User_Manual_v${__APP_VERSION__}.pdf`);
}