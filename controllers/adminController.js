import jwt from "jsonwebtoken";
import { appointmentModel, AppointmentTypes } from "../models/appointmentModel.js";
import { coderModel } from "../models/coderModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials." })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for adding Coder
const addCoder = async (req, res) => {
    try {
        const { name, email, password, specialities, experience, about, appointmentCharges } = req.body;
        const imageFile = req.file;

        // Check for all required fields
        if (!name || !email || !password || !specialities || !experience || !about || !appointmentCharges) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Validate specialities
        const parsedSpecialities = JSON.parse(specialities); // Expecting specialities to be a JSON string
        if (!Array.isArray(parsedSpecialities) || parsedSpecialities.length === 0) {
            return res.json({ success: false, message: "Please provide at least one speciality with fees" });
        }

        // Ensure each speciality object has a name and fee
        for (const speciality of parsedSpecialities) {
            if (!speciality.speciality || typeof speciality.speciality !== 'string' || speciality.speciality.trim() === '') {
                return res.json({ success: false, message: "Each speciality must have a valid name" });
            }
        }

        // Validate appointmentCharges (Assuming it's an array of objects with `appointmentType`, `chargePerHour`, and `durationInMinutes`)
        const parsedAppointmentCharges = JSON.parse(appointmentCharges); // Expecting appointmentCharges to be a JSON string
        if (!Array.isArray(parsedAppointmentCharges) || parsedAppointmentCharges.length === 0) {
            return res.json({ success: false, message: "Please provide at least one appointment charge" });
        }

        // Ensure each appointment charge object has valid fields
        for (const charge of parsedAppointmentCharges) {
            if (!charge.appointmentType || !Object.values(AppointmentTypes).includes(charge.appointmentType)) {
                return res.json({ success: false, message: "Invalid appointment type" });
            }

            if (!charge.chargePerHour || isNaN(parseFloat(charge.chargePerHour)) || parseFloat(charge.chargePerHour) <= 0) {
                return res.json({ success: false, message: "Each charge must have a valid chargePerHour greater than 0" });
            }
        }

        // Hash user password
        const salt = await bcrypt.genSalt(10); // The more rounds, the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Prepare coder data
        const coderData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            specialities: parsedSpecialities, // Store specialities as an array of objects
            experience,
            about,
            appointmentCharges: parsedAppointmentCharges, // Store appointmentCharges as an array of objects
            date: Date.now()
        };

        // Create and save new coder
        const newCoder = new coderModel(coderData);
        await newCoder.save();
        res.json({ success: true, message: 'Coder Added' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to get all coders list for admin panel
const allCoders = async (req, res) => {
    try {

        const coders = await coderModel.find({}).select('-password')
        console.log(coders);
        res.json({ success: true, coders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const coders = await coderModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            coders: coders.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addCoder,
    allCoders,
    adminDashboard
}