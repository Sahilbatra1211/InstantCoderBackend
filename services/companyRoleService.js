import prisma from "../config/prismaClient.js";
import { getAuditFields } from "../utils/prismaUtils.js";

export const createCompanyRoleService = async (data) => {
  const { company_id, role_id, salary_start_range, salary_end_range } = data;
  const auditFields = getAuditFields("admin", true);

  // Check if company_id exists in the company table
  const companyExists = await prisma.company.findUnique({
    where: {
      id: company_id,
    },
  });

  if (!companyExists) {
    throw new Error(`Company with id ${company_id} does not exist`);
  }

  // Check if role_id exists in the role table
  const roleExists = await prisma.role.findUnique({
    where: {
      id: role_id,
    },
  });

  if (!roleExists) {
    throw new Error(`Role with id ${role_id} does not exist`);
  }

  // Create the company role
  const newCompanyRole = await prisma.company_role.create({
    data: {
      company_id,
      role_id,
      salary_start_range,
      salary_end_range,
      ...auditFields,
    },
  });

  return newCompanyRole;
};

export const deleteCompanyRoleService = async (id) => {
  return await prisma.company_role.delete({
    where: { id },
  });
};

export const getRolesByCompanyService = async (companyId) => {
  return await prisma.company_role.findMany({
    where: { company_id: companyId },
    include: {
      role: true, // Fetch role details
    },
  });
};

export const getAllCompanyRolesService = async () => {
  return await prisma.company_role.findMany({
    include: {
      company: true, // Fetch company details
      role: true, // Fetch role details
    },
  });
};
