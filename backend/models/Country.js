import mongoose from "mongoose";

const CountrySchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true },
});

export default mongoose.model("Country", CountrySchema);
