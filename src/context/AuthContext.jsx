import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
   async function getUser(token) {
    try {
      let response = await axios('http://localhost:3000/api/user/me', { headers: {"x-auth-token": token }});
        setUser(response.data);
      
    } catch (err) {
      logout();
      console.error(err);
    }
  }
    useEffect(() => {
      
    const storedUser = localStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
     getUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
