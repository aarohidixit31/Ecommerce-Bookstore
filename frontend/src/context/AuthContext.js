import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Set up axios interceptor for authentication
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token validity
      verifyToken();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      // Check if it's a mock token
      if (token && token.startsWith('mock-jwt-token-')) {
        // For mock tokens, restore user from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const mockUser = existingUsers.find(user => user.email);
        
        if (mockUser) {
          setUser({
            id: mockUser.id,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            email: mockUser.email,
            role: mockUser.role
          });
        } else {
          // Default mock user for demo token
          setUser({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          });
        }
        setLoading(false);
        return;
      }
      
      // Try real backend verification
      const response = await axios.get('/api/users/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Token verification failed:', error);
      // Only logout if it's not a mock token
      if (!token || !token.startsWith('mock-jwt-token-')) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Try backend first
      const response = await axios.post('/auth/signin', {
        email,
        password
      });
      
      const { jwt } = response.data;
      setToken(jwt);
      localStorage.setItem('token', jwt);
      
      // Get user profile
      const userResponse = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Backend login failed, using mock data:', error);
      
      // Mock login for frontend testing when backend is not available
      const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      
      // Check for demo credentials first
      if (email === 'test@example.com' && password === 'password123') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = {
          id: 1,
          firstName: 'Test',
          lastName: 'User',
          email: email,
          role: 'CUSTOMER'
        };
        
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        setUser(mockUser);
        
        return { success: true };
      }
      
      // Check for registered users from signup
      const foundUser = existingUsers.find(user => 
        user.email === email && user.password === password
      );
      
      if (foundUser) {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = {
          id: foundUser.id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          role: foundUser.role
        };
        
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        setUser(mockUser);
        
        return { success: true };
      }
      
      return { 
        success: false, 
        error: 'Invalid credentials. Please sign up first or use test@example.com / password123 for demo.' 
      };
    }
  };

  const signup = async (userData) => {
    try {
      // Try backend first
      const response = await axios.post('/auth/signup', userData);
      
      const { jwt } = response.data;
      setToken(jwt);
      localStorage.setItem('token', jwt);
      
      // Get user profile
      const userResponse = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setUser(userResponse.data);
      
      return { success: true };
    } catch (error) {
      console.error('Backend signup failed, using mock data:', error);
      
      // Store user credentials for future login
      const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const newUser = {
        id: Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: 'CUSTOMER'
      };
      existingUsers.push(newUser);
      localStorage.setItem('mockUsers', JSON.stringify(existingUsers));
      
      // Mock signup for frontend testing when backend is not available
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: newUser.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: 'CUSTOMER'
      };
      
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token
  };



  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};