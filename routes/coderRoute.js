import express from 'express';
import { loginCoder, appointmentsCoder, appointmentCancel, coderList, changeAvailablity, appointmentComplete, coderDashboard, coderProfile, updatecoderProfile } from '../controllers/coderController.js';
import authCoder from '../middleware/authCoder.js';
const coderRouter = express.Router();

coderRouter.post("/login", loginCoder)
coderRouter.post("/cancel-appointment", authCoder, appointmentCancel)
coderRouter.get("/appointments", authCoder, appointmentsCoder)
coderRouter.get("/list", coderList)
coderRouter.post("/change-availability", authCoder, changeAvailablity)
coderRouter.post("/complete-appointment", authCoder, appointmentComplete)
coderRouter.get("/dashboard", authCoder, coderDashboard)
coderRouter.get("/profile", authCoder, coderProfile)
coderRouter.post("/update-profile", authCoder, updatecoderProfile)

export default coderRouter;