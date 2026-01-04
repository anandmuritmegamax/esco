// utils/convert.js
export const feetInchToCm = (ft, inch) => {
    const totalInches = Number(ft || 0) * 12 + Number(inch || 0);
    const cm = totalInches * 2.54;
    return Math.round(cm * 10) / 10;
};

export const cmToFeetInch = (cm) => {
    const totalInches = Number(cm || 0) / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round(totalInches - ft * 12);
    return { ft, inch };
};

export const lbToKg = (lb) => {
    const kg = Number(lb || 0) * 0.45359237;
    return Math.round(kg * 10) / 10;
};

export const kgToLb = (kg) => {
    const lb = Number(kg || 0) / 0.45359237;
    return Math.round(lb * 10) / 10;
};

export const calculateAgeFromDOB = (dob) => {
    if (!dob) return null;
    const birth = new Date(dob);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
};
