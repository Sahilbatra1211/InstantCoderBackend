import express from "express";
import {
  createCollege,
  updateCollege,
  getAllColleges,
  getCollegeById,
  deleteCollege,
} from "../controllers/collegeController.js";
import authAdmin from "../middleware/authAdmin.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  createCollegeRequest,
  updateCollegeRequest,
} from "../validations/collegeValidation.js";

const collegeRouter = express.Router();

collegeRouter.get("/", getAllColleges);
collegeRouter.get("/:id", getCollegeById);

collegeRouter.post(
  "/create",
  authAdmin,
  validateRequest(createCollegeRequest),
  createCollege
);

collegeRouter.post(
  "/:id",
  authAdmin,
  validateRequest(updateCollegeRequest),
  updateCollege
);

collegeRouter.delete("/:id", authAdmin, deleteCollege);

export default collegeRouter;
