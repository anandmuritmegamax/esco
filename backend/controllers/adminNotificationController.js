import Notification from "../models/Notification.js";
import Model from "../models/Model.js";
import sendEmail from "../utils/sendEmail.js";
import { NOTIFICATION_TEMPLATES } from "../utils/notificationTemplates.js";


/**
 * Admin → Send manual notification to model
 */
export const sendManualNotification = async (req, res) => {
    const { modelId, templateKey } = req.body;

    const model = await Model.findById(modelId);
    if (!model) {
        return res.status(404).json({ message: "Model not found" });
    }

    const template = NOTIFICATION_TEMPLATES[templateKey];
    if (!template) {
        return res.status(400).json({ message: "Invalid notification type" });
    }

    // 🔔 Save notification
    const notification = await Notification.create({
        userId: model._id,
        userType: "Model",
        title: template.title,
        message: template.message,
        type: "manual",
    });

    // 📧 Send email
    if (model.email) {
        await sendEmail({
            to: model.email,
            subject: template.title,
            html: `
        <p>Hi ${model.stageName},</p>
        <p>${template.message}</p>
        <p>
          <a href="${process.env.FRONTEND_URL}/pricing">
            Renew / View Plans
          </a>
        </p>
      `,
        });
    }

    res.json({
        success: true,
        notification,
    });
};


export const getMyNotifications = async (req, res) => {
    const notifications = await Notification.find({
        userId: req.user._id,
        userType: "Model",
    }).sort({ createdAt: -1 });

    res.json({ success: true, notifications });
};

