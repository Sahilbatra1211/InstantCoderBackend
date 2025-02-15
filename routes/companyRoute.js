import express from "express";
import {
  createCompany,
  updateCompany,
} from "../controllers/companyController.js";
import authAdmin from "../middleware/authAdmin.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  createCompanyRequest,
  updateCompanyRequest,
} from "../validations/companyValidation.js";

const companyRouter = express.Router();

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

export default companyRouter;
