import mongoose from "mongoose";

// 🔒 Disable buffering (prevents this error forever)
mongoose.set("bufferCommands", false);

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_LOCAL_URI);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err.message);
        process.exit(1);
    }
};
