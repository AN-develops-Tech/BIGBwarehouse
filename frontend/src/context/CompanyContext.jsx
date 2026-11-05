import { createContext, useContext } from 'react';
import { companyData } from '../data/companyData';

const CompanyContext = createContext({
  company: companyData,
  loading: false,
  error: null,
  refreshCompany: () => {}
});

export const CompanyProvider = ({ children }) => {
  return (
    <CompanyContext.Provider value={{ company: companyData, loading: false, error: null, refreshCompany: () => {} }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
