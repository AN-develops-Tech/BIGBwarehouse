import { createContext, useContext, useState } from 'react';
import { companyData } from '../data/companyData';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(companyData);

  const refreshCompany = () => {
    setCompany(companyData);
  };

  return (
    <CompanyContext.Provider value={{ company, loading: false, error: null, refreshCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
