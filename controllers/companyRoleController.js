import {
  createCompanyRoleService,
  deleteCompanyRoleService,
  getRolesByCompanyService,
  getAllCompanyRolesService,
} from "../services/companyRoleService.js";

export const createCompanyRole = async (req, res) => {
  try {
    const newCompanyRole = await createCompanyRoleService(req.body);
    res.status(201).json(newCompanyRole);
  } catch (error) {
    console.error("Company Role creation failed:", error.message || error);
    res.status(500).json({
      error: "Company Role creation failed",
      message: error.message || "Unknown error",
    });
  }
};

export const deleteCompanyRole = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid company role ID" });
    }

    await deleteCompanyRoleService(id);
    res.json({ message: "Company Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete company role" });
  }
};

export const getRolesByCompany = async (req, res) => {
  try {
    const companyId = parseInt(req.params.companyId, 10);
    if (isNaN(companyId)) {
      return res.status(400).json({ error: "Invalid company ID" });
    }

    const roles = await getRolesByCompanyService(companyId);
    res.json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch company roles" });
  }
};

export const getAllCompanyRoles = async (req, res) => {
  try {
    const companyRoles = await getAllCompanyRolesService();
    res.json(companyRoles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch all company roles" });
  }
};
