import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const loadCarts = async () => {
      try {
        // await AsyncStorage.clear();
        const jsonValue = await AsyncStorage.getItem('carts');
        if (jsonValue != null) {
          setCarts(JSON.parse(jsonValue));
        } else {
          setCarts([]);
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
        console.log(carts);
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
      // Find the cart item matching both id and size
      const cartItem = prevCarts.find(
        cartItem => cartItem.id === item.id && cartItem.size === item.size,
      );

      // If item is not found, return the previous cart unchanged
      if (!cartItem) {
        console.warn(
          `Item with id ${item.id} and size ${item.size} not found in cart.`,
        );
        return prevCarts;
      }

      // If quantity is 1, remove the item from the cart
      if (cartItem.quantity === 1) {
        return prevCarts.filter(
          cartItem => !(cartItem.id === item.id && cartItem.size === item.size),
        );
      }

      // Otherwise, decrease the quantity by 1
      return prevCarts.map(cartItem =>
        cartItem.id === item.id && cartItem.size === item.size
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      );
    });
  };

  const getQuiantity = ({ item }) => {
    const cart = carts.find(
      cartItem => cartItem.id === item.id && cartItem.size === item.size,
    );
    return cart ? cart.quantity : 0;
  };

  const isCartPresent = ({ id, size }) => {
    const cart = carts.some(
      cartItem => cartItem.id === id && cartItem.size === size,
    );
    return cart ? true : false;
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        numOfCarts: carts.length,
        getQuiantity,
        isCartPresent
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { useCartContext };
export default CartProvider;
