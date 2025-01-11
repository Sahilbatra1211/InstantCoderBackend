import mongoose from "mongoose";

// Define Appointment Types as a Constant
const AppointmentTypes = {
    VIDEO_MEETING: "VIDEO_MEETING",
    RESUME_REVIEW: "RESUME_REVIEW",
    PRIORITY_DM: "PRIORITY_DM",
    MOCK_INTERVIEW: "MOCK_INTERVIEW",
    CODE_REVIEW: "CODE_REVIEW"
};

// Define Appointment States as a Constant
const AppointmentStates = {
    BOOKING: "BOOKING",
    CONFIRMED: "CONFIRMED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    NO_SHOW: "NO_SHOW"
};

// Appointment Charges Schema
const appointmentChargesSchema = new mongoose.Schema({
    appointmentType: {
        type: String,
        required: true,
        enum: Object.values(AppointmentTypes) // Restricts to defined types
    },
    chargePerHour: { type: Number, required: true },
    durationInMinutes: { type: Number, required: false },
    discount: {
        type: Number,
        default: 0,
        validate: {
            validator: function (value) {
                return value >= 0 && value <= 100;
            },
            message: "Discount must be between 0 and 100."
        }
    }
});

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    coderId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    coderData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    appointmentState: {
        type: String,
        required: true,
        enum: Object.values(AppointmentStates),
        default: AppointmentStates.BOOKING
    },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
});

// Export Models
const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);

export { AppointmentTypes, AppointmentStates, appointmentChargesSchema, appointmentModel };
