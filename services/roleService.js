import prisma from "../config/prismaClient.js";
import { getAuditFields } from "../utils/prismaUtils.js";

export const createRoleService = async (data) => {
  const { roleType, experienceInYears } = data;
  const auditFields = getAuditFields("admin", true);

  const newRole = await prisma.role.create({
    data: {
      role_type: roleType,
      experience_in_years: experienceInYears,
      ...auditFields,
    },
  });

  return newRole;
};

export const updateRoleService = async (id, data) => {
  const { roleType, experienceInYears } = data;

  const updateData = {
    ...(roleType !== undefined && { roleType }),
    ...(experienceInYears !== undefined && { experienceInYears }),
    ...getAuditFields("admin", true),
  };

  const updatedRole = await prisma.role.update({
    where: { id },
    data: updateData,
  });

  return updatedRole;
};

export const getAllRolesService = async () => {
  return await prisma.role.findMany();
};

export const getRoleByIdService = async (id) => {
  return await prisma.role.findUnique({
    where: { id },
  });
};

export const deleteRoleService = async (id) => {
  return await prisma.role.delete({
    where: { id },
  });
};
