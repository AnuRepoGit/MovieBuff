import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Simulate token fetch
    const fetchToken = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/token`);
       setToken(response.data.token);
     
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;




