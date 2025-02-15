import prisma from "../config/prismaClient.js";
import { getAuditFields } from "../utils/prismaUtils.js";

export const createCompanyService = async (data) => {
  const { name, description, logoUrl } = data;
  //change this hardcoding when user table is made
  const auditFields = getAuditFields("admin", true);
  console.log(logoUrl);
  const newCompany = await prisma.company.create({
    data: {
      name,
      description,
      logo_url: logoUrl,
      ...auditFields,
    },
  });
  return newCompany;
};

export const updateCompanyService = async (id, data) => {
  const { name, description, logoUrl } = data;

  const updateData = {
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(logoUrl !== undefined && { logoUrl }),
    ...getAuditFields("admin", true),
  };

  const company = await prisma.company.update({
    where: { id },
    data: updateData,
  });

  return company;
};
