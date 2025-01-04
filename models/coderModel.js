import mongoose from "mongoose";

const specialitySchema = new mongoose.Schema({
    speciality: { type: String, required: true },
    fee: { type: Number, required: true }
});

const coderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    specialities: { type: [specialitySchema], required: true },
    degree: { type: String, required: false },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: false },
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: false },
    date: { type: Number, required: true },
}, { minimize: false });

const coderModel = mongoose.models.coder || mongoose.model("coder", coderSchema);
export default coderModel;
