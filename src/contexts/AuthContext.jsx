import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');

  const login = async token => {
    await AsyncStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setAuthToken(null);
  };

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('authToken');
    setAuthToken(token);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };

export default AuthProvider;
