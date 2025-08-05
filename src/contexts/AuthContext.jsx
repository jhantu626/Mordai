import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState('');
  const [address, setAddress] = useState([]);

  const addAddress = async address => {
    try {
      await AsyncStorage.setItem('address', JSON.stringify(address));
      setAddress(prev => [...prev, address]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAddress = async id => {
    try {
      setAddress(prev => prev.filter(item => item.id !== id));
      await AsyncStorage.removeItem('address');
      await AsyncStorage.setItem('address', JSON.stringify(address));
    } catch (error) {
      console.log(error);
    }
  };

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
    // setAuthToken(token);
    setAuthToken('kjsdfh');
    const address = await AsyncStorage.getItem('address');
    setAddress(JSON.parse(address));
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
        address,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };

export default AuthProvider;
