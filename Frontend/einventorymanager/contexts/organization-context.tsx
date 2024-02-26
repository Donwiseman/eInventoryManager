'use client'

import { OrganizationInterface } from '@/interface';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie'


interface OrganizationContextType {
  organization: OrganizationInterface | null;
  loading: boolean;
  fetchOrganization: (organizationId: string) => void;
  error: string | null;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

interface OrganizationProviderProps {
  children: ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
  const [organization, setOrganization] = useState<OrganizationInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganization = async (organizationId: string) => {
    setLoading(true);
    try {
      const token = Cookies.get('jwt')
      console.log({organizationId}, {token})
      const response = await fetch(`https://test-goinventorymanager.koyeb.app/api/v1/organizations/${organizationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch organization data');
      }

      const organizationData: OrganizationInterface = await response.json();
      setOrganization(organizationData);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch organization:', err);
      setError('Failed to load organization data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const value: OrganizationContextType = {
    organization,
    loading,
    fetchOrganization,
    error,
  };

  return <OrganizationContext.Provider value={value}>{children}</OrganizationContext.Provider>;
};
