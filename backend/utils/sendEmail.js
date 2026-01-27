import nodemailer from "nodemailer";
import getSettingsByGroup from "./getSettingsByGroup.js";

const sendEmail = async ({ to, subject, html }) => {
    const emailSettings = await getSettingsByGroup("email");

    // 🛑 Kill switch
    if (emailSettings["email.disableEmails"]) {
        console.log("📧 Emails disabled by admin");
        return;
    }

    const transporterConfig = {
        host: emailSettings["email.smtpHost"],
        port: Number(emailSettings["email.smtpPort"]),
        secure: Number(emailSettings["email.smtpPort"]) === 465, // SSL only for 465
    };

    // ✅ Add auth ONLY if provided
    if (emailSettings["email.smtpUser"]) {
        transporterConfig.auth = {
            user: emailSettings["email.smtpUser"],
            pass: emailSettings["email.smtpPass"],
        };
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    await transporter.sendMail({
        from: emailSettings["email.fromEmail"] || emailSettings["email.smtpUser"],
        to,
        subject,
        html,
    });
};

export default sendEmail;
