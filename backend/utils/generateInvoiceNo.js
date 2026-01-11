export const generateInvoiceNo = () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");

    return `INV-${y}${m}-${Math.floor(100000 + Math.random() * 900000)}`;
};
