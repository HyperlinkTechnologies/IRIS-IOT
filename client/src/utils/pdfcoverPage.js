// src/utils/pdfCoverPage.js

import { pdfTheme } from "./pdfTheme";

export function addCoverPage(doc) {
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  doc.setFillColor(pdfTheme.colors.primary);
  doc.rect(0, 0, width, 40, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);

  doc.text("IRIS IoT Platform", width / 2, 24, {
    align: "center",
  });

  doc.setTextColor(pdfTheme.colors.secondary);

  doc.setFontSize(22);
  doc.text("User Manual", width / 2, 80, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text(`Version ${__APP_VERSION__}`, width / 2, 95, {
  align: "center",
});

  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    width / 2,
    105,
    {
      align: "center",
    }
  );

  doc.setFontSize(11);

  doc.text(
    "Comprehensive documentation for configuring,",
    width / 2,
    145,
    {
      align: "center",
    }
  );

  doc.text(
    "deploying, and operating the IRIS IoT Platform.",
    width / 2,
    152,
    {
      align: "center",
    }
  );

  doc.setFontSize(9);
  doc.setTextColor(pdfTheme.colors.lightText);

  doc.text(
    "© Hyperlink InfoSystem Technologies",
    width / 2,
    height - 20,
    {
      align: "center",
    }
  );

  doc.addPage();
}