import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  picture?: string;
};

type MockAuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const MockAuthContext = createContext<MockAuthContextType | null>(null);

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

interface MockAuthProviderProps {
  children: ReactNode;
}

// Demo users for testing
const DEMO_USERS = [
  {
    name: "Demo User",
    email: "demo@example.com",
    password: "password",
  }
];

export function MockAuthProvider({ children }: MockAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedAuth = localStorage.getItem('mock_auth_user');
        if (storedAuth) {
          const parsedUser = JSON.parse(storedAuth);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading stored authentication:', error);
        localStorage.removeItem('mock_auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user with matching credentials
    const foundUser = DEMO_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      const userObj = {
        name: foundUser.name,
        email: foundUser.email,
        // Generate initials-based avatar color
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(foundUser.name)}&background=random`
      };
      
      setUser(userObj);
      setIsAuthenticated(true);
      localStorage.setItem('mock_auth_user', JSON.stringify(userObj));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      return false;
    }
    
    // In a real implementation, we'd create the user in the database
    // For this mock, we'll just create the session
    const userObj = {
      name,
      email,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };
    
    setUser(userObj);
    setIsAuthenticated(true);
    localStorage.setItem('mock_auth_user', JSON.stringify(userObj));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('mock_auth_user');
  };

  const contextValue = {
    isAuthenticated,
    user,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <MockAuthContext.Provider value={contextValue}>
      {children}
    </MockAuthContext.Provider>
  );
}