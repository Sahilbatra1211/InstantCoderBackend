export const filterCompanyData = (company) => {
  if (!company) return null;
  return {
    id: company.id,
    name: company.name,
    description: company.description,
    logoUrl: company.logo_url,
  };
};
