import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

   async function getUser(token) {
    try {
      let response = await axios('http://localhost:3000/api/user/me', 
        { headers: {"x-auth-token": token },
      });
        setUser(response.data);
      
    } catch (err) {
      console.error('Failed to fetch user:', err);
      logout();
    }
  }
    useEffect(() => {
     
      const storedToken = localStorage.getItem('token');
    // const storedUser = localStorage.getItem('user');
    console.log('Stored token:', storedToken);
    if (storedToken) { // used to be storedUser
     getUser(storedToken); // used to be storedUser
    }
  }, []);

  const login = async (userData) => {
    localStorage.setItem('token', userData.token); // used to be 'user'
    await getUser(userData.token);
  };

  function logout() {
    setUser(null);
    localStorage.removeItem('token'); // used to be 'user'
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
