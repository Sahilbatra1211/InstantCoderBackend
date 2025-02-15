import express from "express";
import {
  createCompany,
  updateCompany,
  getAllCompanies,
  getCompanyById,
  deleteCompany,
} from "../controllers/companyController.js";
import authAdmin from "../middleware/authAdmin.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  createCompanyRequest,
  updateCompanyRequest,
} from "../validations/companyValidation.js";

const companyRouter = express.Router();

companyRouter.get("/", getAllCompanies);

companyRouter.get("/:id", getCompanyById);

companyRouter.post(
  "/create",
  authAdmin,
  validateRequest(createCompanyRequest),
  createCompany
);

companyRouter.post(
  "/:id",
  authAdmin,
  validateRequest(updateCompanyRequest),
  updateCompany
);

companyRouter.delete("/:id", authAdmin, deleteCompany);

export default companyRouter;
