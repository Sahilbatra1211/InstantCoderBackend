export const getAuditFields = (userId, isCreate = false) => {
  const now = new Date();
  return {
    created_at: isCreate ? now : undefined,
    updated_at: now,
    created_by: isCreate ? userId : undefined,
    updated_by: userId,
  };
};
