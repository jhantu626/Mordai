import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState([]);

  const addAddress = async ({ add }) => {
    try {
      const updatedAddress = [...address, add];
      setAddress(updatedAddress);
      await AsyncStorage.setItem('address', JSON.stringify(updatedAddress));
    } catch (error) {
      console.log(error);
    }
  };

  const removeAddress = async ({ add }) => {
    try {
      const updatedAddress = address.filter(item => item.id !== add.id);
      setAddress(updatedAddress);
      await AsyncStorage.setItem('address', JSON.stringify(updatedAddress));
    } catch (error) {
      console.log(error);
    }
  };

  const updateAddress = async ({ add }) => {
    try {
      const updatedAddress = address.map(item =>
        item.id === add.id ? add : item,
      );
      setAddress(updatedAddress);
      await AsyncStorage.setItem('address', JSON.stringify(updatedAddress));
    } catch (error) {
      console.error(error);
    }
  };

  const check = async () => {
    try {
      const data = await AsyncStorage.getItem('address');
      if (data !== null) {
        setAddress(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    check();
  }, [address]);

  return (
    <AddressContext.Provider
      value={{
        address,
        addAddress,
        removeAddress,
        updateAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default AddressProvider;

const useAddress = () => useContext(AddressContext);

export { useAddress };
