import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getUser(token) {
    try {
      let response = await axios.get('http://localhost:3000/api/user/me', {
        headers: { "x-auth-token": token },
      });
      setUser({ ...response.data, user });
    } catch (err) {
      console.error('Failed to fetch user:', err);
      logout();
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      getUser(storedToken);
    }
  }, []);

  const login = async (userData) => {
    localStorage.setItem('token', userData.token);
    await getUser(userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // ----- New function to update user profile -----
  const updateProfile = async (updatedData) => {
    const token = localStorage.getItem('token');
    if (!token) return { success: false, msg: "No token found" };

    try {
      const response = await axios.put('http://localhost:3000/api/user/me', updatedData, {
        headers: { "x-auth-token": token },
      });
      setUser(response.data); // update context with new user info
      return { success: true };
    } catch (err) {
      console.error("Failed to update profile:", err.response?.data || err);
      return { success: false, errors: err.response?.data?.errors };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
