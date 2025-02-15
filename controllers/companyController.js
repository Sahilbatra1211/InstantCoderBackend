import {
  createCompanyService,
  updateCompanyService,
  getAllCompaniesService,
  getCompanyByIdService,
  deleteCompanyService,
} from "../services/companyService.js";
import { companyResponse } from "../validations/companyValidation.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = await createCompanyService(req.body);

    const responseValidation = companyResponse.safeParse(newCompany);
    if (!responseValidation.success) {
      console.log(responseValidation.error.errors);
      return res.status(500).json({ errors: responseValidation.error.errors });
    }

    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Company creation failed:", error.message || error);
    res.status(500).json({
      error: "Company creation failed",
      message: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedCompany = await updateCompanyService(id, req.body);

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    const responseValidation = companyResponse.safeParse(updatedCompany);
    if (!responseValidation.success) {
      return res.status(500).json({ errors: responseValidation.error.errors });
    }

    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Company update failed",
      message: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await getAllCompaniesService();
    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const company = await getCompanyByIdService(id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch company" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid company ID" });
    }

    const deletedCompany = await deleteCompanyService(id);
    res.json({
      message: "Company deleted successfully",
      company: deletedCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete company" });
  }
};
