import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const loadCarts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('carts');
        if (jsonValue != null) {
          setCarts(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load carts from storage', e);
      }
    };
    loadCarts();
  }, []);

  useEffect(() => {
    const saveCarts = async () => {
      try {
        await AsyncStorage.setItem('carts', JSON.stringify(carts));
      } catch (e) {
        console.error('Failed to save carts to storage', e);
      }
    };
    saveCarts();
  }, [carts]);

  const addToCart = ({ cart }) => {
    setCarts(prevCarts => {
      const index = prevCarts.findIndex(
        item => item.id === cart.id && item.size === cart.size,
      );

      if (index !== -1) {
        const updatedCarts = [...prevCarts];
        updatedCarts[index].quantity += 1;
        return updatedCarts;
      } else {
        return [...prevCarts, { ...cart, quantity: 1 }];
      }
    });
  };

  const removeFromCart = ({ item }) => {
    setCarts(prevCarts => {
      if (item.quantity === 1) {
        return prevCarts.filter(
          cartItem => !(cartItem.id === item.id && cartItem.size === item.size),
        );
      } else {
        return prevCarts.map(cartItem => {
          if (cartItem.id === item.id && cartItem.size === item.size) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        numOfCarts: carts.reduce((sum, item) => sum + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { useCartContext };
export default CartProvider;
