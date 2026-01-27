import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    country_id: { type: Number, required: true },
});

CitySchema.index({ country_id: 1 });

export default mongoose.model("City", CitySchema);
