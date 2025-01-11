import mongoose from "mongoose";
import { appointmentChargesSchema } from './appointmentModel.js'; // Correct relative path with .js extension

// Speciality Schema
const specialitySchema = new mongoose.Schema({
    speciality: { type: String, required: true }
});

// Coder Schema
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
    appointmentCharges: { type: [appointmentChargesSchema], required: true }, // Specific charges for different appointment types
    slots_booked: { type: Object, default: {} },
    address: { type: Object, required: false },
    date: { type: Number, required: true }
}, { minimize: false });

// Export Models
const coderModel = mongoose.models.coder || mongoose.model("coder", coderSchema);
export { coderModel };
