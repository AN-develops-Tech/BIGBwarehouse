import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { companyData } from '../data/companyData';

const CompanyContext = createContext(null);

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(companyData);

  const refreshCompany = useCallback(() => {
    setCompany(companyData);
  }, []);

  const value = useMemo(() => ({
    company,
    loading: false,
    error: null,
    refreshCompany
  }), [company, refreshCompany]);

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    return { company: companyData, loading: false, error: null, refreshCompany: () => {} };
  }
  return context;
};
