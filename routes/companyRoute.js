import express from 'express';
import {
  createCompany,
  getCompanies,
  getCompanyByName,
  updateCompany,
  deleteCompany,
  getCompaniesWithLevelNames
} from '../controllers/companyController.js';
import authAdmin from '../middleware/authAdmin.js';

const companyRouter = express.Router();

companyRouter.post("/create", authAdmin, createCompany); // Create a new company
companyRouter.get("/", getCompanies); // Get all companies
companyRouter.get("/companylevels", getCompaniesWithLevelNames); // Get company names and level names
companyRouter.get("/:name", getCompanyByName); // Get a company by name
companyRouter.put("/:name", authAdmin, updateCompany); // Update a company
companyRouter.delete("/:name", authAdmin, deleteCompany); // Delete a company



export default companyRouter;
