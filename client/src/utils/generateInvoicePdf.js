import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import irisSymbolUrl from "../assets/IRIS Logo(light).png";
import irisWordmarkUrl from "../assets/iris-logo.png";
import poppinsRegularUrl from "../assets/fonts/Poppins-Regular.ttf?url";
import poppinsMediumUrl from "../assets/fonts/Poppins-Medium.ttf?url";
import poppinsSemiBoldUrl from "../assets/fonts/Poppins-SemiBold.ttf?url";
import poppinsBoldUrl from "../assets/fonts/Poppins-Bold.ttf?url";

const PLAN_NAMES = {
  starter: "Get Started",
  prototype: "Prototype/POC",
  industrial: "Industrial",
};

function formatAmount(amount) {
  return `₹${(amount / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


async function loadImageAsDataUrl(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
}

async function loadFontAsBase64(fontUrl) {
  const response = await fetch(fontUrl);
  const buffer = await response.arrayBuffer();

  const bytes = new Uint8Array(buffer);
  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(i, i + chunkSize)
    );
  }

  return btoa(binary);
}

export async function generateInvoicePdf(invoice, customer) {
  if (!invoice || invoice.status !== "CAPTURED") {
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const [
  regularFont,
  mediumFont,
  semiBoldFont,
  boldFont,
] = await Promise.all([
  loadFontAsBase64(poppinsRegularUrl),
  loadFontAsBase64(poppinsMediumUrl),
  loadFontAsBase64(poppinsSemiBoldUrl),
  loadFontAsBase64(poppinsBoldUrl),
]);

doc.addFileToVFS("Poppins-Regular.ttf", regularFont);
doc.addFileToVFS("Poppins-Medium.ttf", mediumFont);
doc.addFileToVFS("Poppins-SemiBold.ttf", semiBoldFont);
doc.addFileToVFS("Poppins-Bold.ttf", boldFont);

doc.addFont("Poppins-Regular.ttf", "Poppins", "normal");
doc.addFont("Poppins-Medium.ttf", "Poppins", "medium");
doc.addFont("Poppins-SemiBold.ttf", "Poppins", "semibold");
doc.addFont("Poppins-Bold.ttf", "Poppins", "bold");

doc.setFont("Poppins", "normal");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // --------------------------------------------------
  // IRIS PLATFORM COLORS
  // --------------------------------------------------

  const navy = "#010C29";
  const orange = "#FF5700";

  const text = "#243044";
  const muted = "#667085";
  const border = "#D9DEE7";
  const panel = "#F8FAFC";

  const successBackground = "#F0FDF4";
  const successBorder = "#86EFAC";
  const successText = "#166534";

  // --------------------------------------------------
  // PDF METADATA
  // --------------------------------------------------

  doc.setProperties({
    title: `IRIS Invoice ${invoice.irisOrderId}`,
    subject: "IRIS IoT Platform Payment Invoice",
    author: "IRIS IoT Platform",
    creator: "IRIS IoT Platform",
  });

  // --------------------------------------------------
  // TOP BRANDING BAR
  // --------------------------------------------------

  doc.setFillColor(navy);
  doc.rect(0, 0, pageWidth, 4, "F");

  doc.setFillColor(orange);
  doc.rect(0, 0, pageWidth * 0.68, 4, "F");

  // --------------------------------------------------
// HEADER
// --------------------------------------------------

let irisSymbol = null;
let irisWordmark = null;

try {
  irisSymbol = await loadImageAsDataUrl(irisSymbolUrl);
  irisWordmark = await loadImageAsDataUrl(irisWordmarkUrl);
} catch (error) {
  console.warn("Unable to load IRIS logo assets:", error);
}

// IRIS symbol
if (irisSymbol) {
  doc.addImage(
    irisSymbol,
    "PNG",
    margin,
    11,
    13,
    15,
    undefined,
    "FAST"
  );
}

// IRIS wordmark
if (irisWordmark) {
  doc.addImage(
    irisWordmark,
    "PNG",
    margin + 15,
    13,
    29,
    11,
    undefined,
    "FAST"
  );
}

// Invoice heading
doc.setFont("Poppins", "bold");
doc.setFontSize(22);
doc.setTextColor(navy);

doc.text(
  "INVOICE",
  pageWidth - margin,
  20,
  {
    align: "right",
  }
);

doc.setFont("Poppins", "normal");
doc.setFontSize(8.5);
doc.setTextColor(orange);

doc.text(
  "Payment Invoice",
  pageWidth - margin,
  26,
  {
    align: "right",
  }
);

  // --------------------------------------------------
  // INVOICE DETAILS
  // --------------------------------------------------

  let y = 42;

  const detailsHeight = 34;

  doc.setFillColor(panel);
  doc.setDrawColor(border);

  doc.roundedRect(
    margin,
    y,
    contentWidth,
    detailsHeight,
    2,
    2,
    "FD"
  );

  doc.setFont("Poppins", "bold");
  doc.setFontSize(9);
  doc.setTextColor(navy);

  doc.text("INVOICE DETAILS", margin + 5, y + 7);

  const details = [
    ["Invoice ID", invoice.irisOrderId || "-"],
    ["Invoice Date", formatDate(invoice.createdAt)],
    ["Payment Reference", invoice.razorpayPaymentId || "-"],
  ];

  let detailY = y + 14;

  details.forEach(([label, value]) => {
    doc.setFont("Poppins", "normal");
    doc.setFontSize(8);

    doc.setTextColor(muted);
    doc.text(label, margin + 5, detailY);

    doc.setTextColor(text);
    doc.text(":", margin + 48, detailY);

    doc.setFont("Poppins", "bold");
    doc.text(value, margin + 53, detailY);

    detailY += 6;
  });

  // --------------------------------------------------
  // BILLED FROM / BILLED TO
  // --------------------------------------------------

  y += detailsHeight + 8;

  const boxGap = 5;
  const boxWidth = (contentWidth - boxGap) / 2;
  const boxHeight = 44;

  // Left box
  doc.setFillColor("#FFFFFF");
  doc.setDrawColor(border);

  doc.roundedRect(
    margin,
    y,
    boxWidth,
    boxHeight,
    2,
    2,
    "FD"
  );

  // Right box
  doc.roundedRect(
    margin + boxWidth + boxGap,
    y,
    boxWidth,
    boxHeight,
    2,
    2,
    "FD"
  );

  // Titles
  doc.setFont("Poppins", "bold");
  doc.setFontSize(9);
  doc.setTextColor(navy);

  doc.text("BILLED FROM", margin + 5, y + 8);

  doc.text(
    "BILLED TO",
    margin + boxWidth + boxGap + 5,
    y + 8
  );

  // From
  doc.setFont("Poppins", "bold");
  doc.setFontSize(8);
  doc.setTextColor(text);

  doc.text(
    "IRIS IoT Platform",
    margin + 5,
    y + 17
  );

  doc.setFont("Poppins", "normal");


  doc.text(
    "Chennai, TamilNadu, India",
    margin + 5,
    y + 29
  );

  doc.text(
    "mail: support@irisiotplatform.com",
    margin + 5,
    y + 35
  );

  // Customer
  const customerX = margin + boxWidth + boxGap + 5;

  doc.setFont("Poppins", "bold");

  doc.text(
    customer?.name || "IRIS Customer",
    customerX,
    y + 17
  );

  doc.setFont("Poppins", "normal");

  doc.text(
    `Customer ID: ${customer?.id || "-"}`,
    customerX,
    y + 24
  );

  doc.text(
    `mail ID: ${customer?.email || "-"}`,
    customerX,
    y + 31
  );

  // --------------------------------------------------
  // ITEMS TABLE
  // --------------------------------------------------

  y += boxHeight + 7;

  const planName =
    PLAN_NAMES[invoice.planId] ||
    invoice.planId ||
    "IRIS IoT Plan";

  const amount = formatAmount(invoice.amount);

  autoTable(doc, {
    startY: y,

    margin: {
      left: margin,
      right: margin,
    },

    theme: "grid",

    head: [
      [
        "DESCRIPTION",
        "QTY",
        "UNIT PRICE (₹)",
        "TOTAL (₹)",
      ],
    ],

    body: [
      [
        `${planName} Plan\nMonthly Subscription`,
        "1",
        amount,
        amount,
      ],
    ],

    styles: {
      font: "Poppins",
      fontSize: 8.5,
      textColor: text,

      lineColor: border,
      lineWidth: 0.25,

      cellPadding: {
        top: 4,
        right: 4,
        bottom: 4,
        left: 4,
      },

      valign: "middle",
    },

    headStyles: {
      fillColor: navy,
      textColor: "#FFFFFF",

      fontStyle: "bold",
      fontSize: 8,

      cellPadding: {
        top: 4,
        right: 4,
        bottom: 4,
        left: 4,
      },

      halign: "center",
    },

    columnStyles: {
      0: {
        cellWidth: 90,
        halign: "left",
      },

      1: {
        cellWidth: 18,
        halign: "center",
      },

      2: {
        cellWidth: 37,
        halign: "right",
      },

      3: {
        cellWidth: 37,
        halign: "right",
      },
    },

    didParseCell(data) {
      if (
        data.section === "body" &&
        data.column.index === 0
      ) {
        data.cell.styles.fontStyle = "bold";
      }

      if (
        data.section === "body" &&
        data.column.index > 0
      ) {
        data.cell.styles.fontStyle = "normal";
      }
    },
  });

  // --------------------------------------------------
  // TOTALS
  // --------------------------------------------------

  const finalY = doc.lastAutoTable.finalY;

  const totalsWidth = 75;
  const totalsX = pageWidth - margin - totalsWidth;

  doc.setFont("Poppins", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(text);

  doc.text(
    "Subtotal",
    totalsX,
    finalY + 11
  );

  doc.text(
    amount,
    pageWidth - margin,
    finalY + 11,
    {
      align: "right",
    }
  );

  doc.setDrawColor(border);

  doc.line(
    totalsX,
    finalY + 15,
    pageWidth - margin,
    finalY + 15
  );

  // Total highlight
  doc.setFillColor("#FFF7ED");

  doc.roundedRect(
    totalsX - 4,
    finalY + 18,
    totalsWidth + 4,
    13,
    2,
    2,
    "F"
  );

  doc.setFont("Poppins", "bold");
  doc.setFontSize(10);
  doc.setTextColor(orange);

  doc.text(
    "TOTAL",
    totalsX,
    finalY + 27
  );

  doc.text(
    amount,
    pageWidth - margin,
    finalY + 27,
    {
      align: "right",
    }
  );

  // --------------------------------------------------
  // PAYMENT CONFIRMATION
  // --------------------------------------------------

  const confirmationY = finalY + 36;

  doc.setFillColor(successBackground);
  doc.setDrawColor(successBorder);

  doc.roundedRect(
    margin,
    confirmationY,
    contentWidth,
    27,
    2,
    2,
    "FD"
  );

  doc.setFont("Poppins", "bold");
  doc.setFontSize(9);
  doc.setTextColor(successText);

  doc.text(
    "Payment received successfully.",
    margin + 7,
    confirmationY + 10
  );

  doc.setFont("Poppins", "normal");
  doc.setFontSize(8);

  doc.text(
    "Thank you for choosing IRIS IoT Platform.",
    margin + 7,
    confirmationY + 17
  );

  // --------------------------------------------------
  // FOOTER
  // --------------------------------------------------

  const footerY = pageHeight - 30;

  doc.setFillColor(navy);

  doc.rect(
    margin,
    footerY,
    contentWidth,
    11,
    "F"
  );

  doc.setFont("Poppins", "normal");
doc.setFontSize(7.5);
doc.setTextColor("#FFFFFF");

const websiteText = "www.irisiotplatform.com";

doc.text(
  websiteText,
  margin + 5,
  footerY + 7
);

doc.link(
  margin + 5,
  footerY + 2,
  35,
  6,
  {
    url: "https://www.irisiotplatform.com",
  }
);

  const emailText = "support@irisiotplatform.com";

doc.text(
  emailText,
  pageWidth - margin - 5,
  footerY + 7,
  {
    align: "right",
  }
);

doc.link(
  pageWidth - margin - 40,
  footerY + 2,
  40,
  6,
  {
    url: "mailto:support@irisiotplatform.com",
  }
);

  doc.setFontSize(7);
  doc.setTextColor(muted);

  doc.text(
    "This is a computer generated invoice and does not require a signature.",
    pageWidth / 2,
    pageHeight - 10,
    {
      align: "center",
    }
  );

  // --------------------------------------------------
  // DOWNLOAD
  // --------------------------------------------------

  doc.save(`${invoice.irisOrderId}.pdf`);
}