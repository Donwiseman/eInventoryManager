'use client'

import { UserInterface } from '@/interface';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie'


interface UserContextType {
  user: UserInterface | null;
  loading: boolean;
  fetchUser: () => void;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('jwt')
      const response = await fetch('https://test-goinventorymanager.koyeb.app/api/v1/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData: UserInterface = await response.json();
      setUser(userData);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch user:', err);
      setError('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value: UserContextType = {
    user,
    loading,
    fetchUser,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
