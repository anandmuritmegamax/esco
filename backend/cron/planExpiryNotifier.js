import cron from "node-cron";
import Model from "../models/Model.js";
import Notification from "../models/Notification.js";
import sendEmail from "../utils/sendEmail.js";
import { planExpiryEmail } from "../emails/planExpiryEmail.js";

/**
 * Runs daily at 10:00 AM
 */
cron.schedule("0 10 * * *", async () => {
    console.log("🔔 Running plan expiry notification job");

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const models = await Model.find({
        "advertising.expiresAt": {
            $gte: targetDate,
            $lt: nextDay,
        },
    });

    for (const model of models) {
        /* 🔔 In-app notification */
        await Notification.create({
            userId: model._id,
            userType: "Model",
            title: "Plan Expiry Reminder",
            message: `Your advertising plan "${model.advertising.planName}" will expire in 5 days.`,
            type: "plan_expiry",
        });

        /* 📧 Email reminder */
        if (model.email) {
            await sendEmail({
                to: model.email,
                subject: "Your advertising plan is expiring soon",
                html: planExpiryEmail({
                    name: model.stageName,
                    planName: model.advertising.planName,
                    expiresAt: model.advertising.expiresAt,
                }),
            });
        }
    }

    console.log(`✅ ${models.length} email reminders sent`);
});
