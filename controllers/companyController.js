
import CompanyModel from "../models/companyModel.js";

// create a company
const createCompany = async (req, res) => {
  try {
    const { name, levels } = req.body;

    const newCompany = new CompanyModel({ name, levels });
    await newCompany.save();

    res.json({ success: true, message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await CompanyModel.find({});
    res.json({ success: true, companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCompanyByName = async (req, res) => {
  try {
    const { name } = req.params;

    const company = await CompanyModel.findOne({ name });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name } = req.params;
    const updates = req.body;

    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { name },
      { $set: updates },
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, message: "Company updated successfully", company: updatedCompany });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteCompany = async (req, res) => {
  try {
    const { name } = req.params;

    const deletedCompany = await CompanyModel.findOneAndDelete({ name });
    if (!deletedCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createCompany,
  getCompanies,
  getCompanyByName,
  updateCompany,
  deleteCompany
};