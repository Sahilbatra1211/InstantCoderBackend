import express from "express";
import {
  createCompanyRole,
  deleteCompanyRole,
  getRolesByCompany,
  getAllCompanyRoles,
} from "../controllers/companyRoleController.js";

const router = express.Router();

router.post("/create", createCompanyRole); // Add a role to a company
router.delete("/:id", deleteCompanyRole); // Delete a company role
router.get("/:companyId", getRolesByCompany); // Get roles for a specific company
router.get("/", getAllCompanyRoles); // Get roles for all companies

export default router;
