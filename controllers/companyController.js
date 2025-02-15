import {
  createCompanyService,
  updateCompanyService,
} from "../services/companyService.js";
import { companyResponse } from "../validations/companyValidation.js";

export const createCompany = async (req, res) => {
  try {
    const newCompany = await createCompanyService(req.body);

    const filteredCompany = {
      id: newCompany.id,
      name: newCompany.name,
      description: newCompany.description,
      logoUrl: newCompany.logo_url, // Ensure it matches your response schema
    };

    const responseValidation = companyResponse.safeParse(filteredCompany);

    if (!responseValidation.success) {
      console.log(responseValidation.error.errors);
      return res.status(500).json({ errors: responseValidation.error.errors });
    }

    res.status(201).json(filteredCompany); // ✅ ID is automatically included in response
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
    const company = await updateCompanyService(id, req.body);

    const filteredCompany = {
      id: company.id,
      name: company.name,
      description: company.description,
      logoUrl: company.logo_url, // Ensure it matches your response schema
    };

    const responseValidation = companyResponse.safeParse(filteredCompany);
    if (!responseValidation.success) {
      return res.status(500).json({ errors: responseValidation.error.errors });
    }

    res.json(filteredCompany); // ✅ Now always returns the `id`
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Company updation failed",
      message: error.message || "Unknown error",
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
