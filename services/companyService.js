import prisma from "../config/prismaClient.js";
import { getAuditFields } from "../utils/prismaUtils.js";
import { filterCompanyData } from "../utils/companyUtils.js";

export const createCompanyService = async (data) => {
  const { name, description, logoUrl } = data;
  const auditFields = getAuditFields("admin", true);

  const newCompany = await prisma.company.create({
    data: {
      name,
      description,
      logo_url: logoUrl,
      ...auditFields,
    },
  });

  return filterCompanyData(newCompany);
};

export const updateCompanyService = async (id, data) => {
  const { name, description, logoUrl } = data;

  const updateData = {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(logoUrl !== undefined && { logo_url: logoUrl }),
    ...getAuditFields("admin", true),
  };

  const updatedCompany = await prisma.company.update({
    where: { id },
    data: updateData,
  });

  return filterCompanyData(updatedCompany);
};

export const getAllCompaniesService = async () => {
  const companies = await prisma.company.findMany();
  return companies.map(filterCompanyData);
};

export const getCompanyByIdService = async (id) => {
  const company = await prisma.company.findUnique({
    where: { id },
  });

  return filterCompanyData(company);
};

export const deleteCompanyService = async (id) => {
  const deletedCompany = await prisma.company.delete({
    where: { id },
  });
  return filterCompanyData(deletedCompany);
};