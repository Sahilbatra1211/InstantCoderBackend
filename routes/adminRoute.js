import express from 'express';
import { loginAdmin, appointmentsAdmin, appointmentCancel, addCoder, allCoders, adminDashboard } from '../controllers/adminController.js';
import { changeAvailablity } from '../controllers/coderController.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-coder", authAdmin, upload.single('image'), addCoder)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/all-coders", authAdmin, allCoders)
adminRouter.post("/change-availability", authAdmin, changeAvailablity)
adminRouter.get("/dashboard", authAdmin, adminDashboard)

export default adminRouter;