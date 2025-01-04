import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import coderModel from "../models/coderModel.js";
import appointmentModel from "../models/appointmentModel.js";

// API for coder Login 
const loginCoder = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await coderModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get coder appointments for coder panel
const appointmentsCoder = async (req, res) => {
    try {

        const { coderId } = req.body
        const appointments = await appointmentModel.find({ coderId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for coder panel
const appointmentCancel = async (req, res) => {
    try {

        const { coderId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.coderId === coderId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for coder panel
const appointmentComplete = async (req, res) => {
    try {

        const { coderId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.coderId === coderId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all coders list for Frontend
const coderList = async (req, res) => {
    try {

        const coders = await coderModel.find({}).select(['-password', '-email'])
        res.json({ success: true, coders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change coder availablity for Admin and coder Panel
const changeAvailablity = async (req, res) => {
    try {

        const { coderId } = req.body

        const coderData = await coderModel.findById(coderId)
        await coderModel.findByIdAndUpdate(coderId, { available: !coderData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get coder profile for  coder Panel
const coderProfile = async (req, res) => {
    try {

        const { coderId } = req.body
        const profileData = await coderModel.findById(coderId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update coder profile data from  coder Panel
const updatecoderProfile = async (req, res) => {
    try {

        const { coderId, fees, address, available } = req.body

        await coderModel.findByIdAndUpdate(coderId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for coder panel
const coderDashboard = async (req, res) => {
    try {

        const { coderId } = req.body

        const appointments = await appointmentModel.find({ coderId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })



        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export {
    loginCoder,
    appointmentsCoder,
    appointmentCancel,
    coderList,
    changeAvailablity,
    appointmentComplete,
    coderDashboard,
    coderProfile,
    updatecoderProfile
}