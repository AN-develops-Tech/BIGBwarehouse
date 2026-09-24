import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompany = useCallback(async () => {
        try {
            const response = await api.get('/company/');
            let companyData = null;
            if (response.data.results && response.data.results.length > 0) {
                companyData = response.data.results[0];
            } else if (Array.isArray(response.data) && response.data.length > 0) {
                companyData = response.data[0];
            } else if (!Array.isArray(response.data) && Object.keys(response.data).length > 0) {
                companyData = response.data;
            }
            if (companyData) {
                setCompany(companyData);
                setError(null);
            } else {
                setError('No company details found.');
            }
        } catch (err) {
            setError('Failed to load company details.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCompany();
    }, [fetchCompany]);

    return (
        <CompanyContext.Provider value={{ company, loading, error, refreshCompany: fetchCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => useContext(CompanyContext);

