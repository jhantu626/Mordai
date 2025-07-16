import { Children, createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  const addToCart = ({ cart }) => {
    setCarts(prevCarts => {
      const index = prevCarts.findIndex(
        item => item.id === cart.id && item.size === cart.size,
      );

      if (index !== -1) {
        // Increase quantity by 1
        const updatedCarts = [...prevCarts];
        updatedCarts[index].quantity += 1;
        return updatedCarts;
      } else {
        // Add new item with quantity 1
        return [...prevCarts, { ...cart, quantity: 1 }];
      }
    });
  };

  const removeFromCart = ({ item }) => {
    setCarts(prevCarts =>
      prevCarts.filter(
        cartItem => !(cartItem.id === item.id && cartItem.size === item.size),
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{ carts, addToCart, removeFromCart, numOfCarts: carts.length }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

const useCartContext = () => {
  return useContext(CartContext);
};

export { useCartContext };
