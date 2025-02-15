import prisma from "../config/prismaClient.js";
import { getAuditFields } from "../utils/prismaUtils.js";

export const createCollegeService = async (data) => {
  const { name } = data;
  const auditFields = getAuditFields("admin", true);

  return await prisma.college.create({
    data: {
      name,
      ...auditFields,
    },
  });
};

export const updateCollegeService = async (id, data) => {
  const { name } = data;

  const updateData = {
    ...(name !== undefined && { name }),
    ...getAuditFields("admin", true),
  };

  return await prisma.college.update({
    where: { id },
    data: updateData,
  });
};

export const getAllCollegesService = async () => {
  return await prisma.college.findMany();
};

export const getCollegeByIdService = async (id) => {
  return await prisma.college.findUnique({
    where: { id },
  });
};

export const deleteCollegeService = async (id) => {
  return await prisma.college.delete({
    where: { id },
  });
};
