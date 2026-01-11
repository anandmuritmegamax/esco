import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoicePDF = (invoice) => {
    const doc = new PDFDocument();
    const filePath = `./invoices/${invoice.invoiceNo}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text("Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice No: ${invoice.invoiceNo}`);
    doc.text(`Date: ${invoice.issuedAt.toDateString()}`);
    doc.text(`Status: ${invoice.paymentStatus.toUpperCase()}`);
    doc.moveDown();

    doc.text(`Description: Advertising package`);
    doc.text(`Plan: ${invoice.planName}`);
    doc.text(`Amount: ${invoice.amount} ${invoice.currency}`);

    doc.moveDown();
    doc.text("This invoice is issued by a digital advertising platform.");

    doc.end();

    return filePath;
};
