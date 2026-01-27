import mongoose from "mongoose";
import Setting from "../models/Setting.js";

const getSettingsByGroup = async (group) => {
    if (mongoose.connection.readyState !== 1) {
        console.error("❌ MongoDB not connected yet");
        return {};
    }

    const settings = await Setting.find({ group }).lean();
    const data = {};

    settings.forEach(s => {
        data[s.key] = s.value;
    });

    return data;
};

export default getSettingsByGroup;
