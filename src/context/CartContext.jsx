import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const getCartStorageKey = (user) => `cartItems_${user?.uid ?? "anonymous"}`;

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe ser usado dentro de un CartProvider");
  }
  return context;
};

const getStoredCartItems = (cartKey) => {
  try {
    const stored = localStorage.getItem(cartKey);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const cartKey = getCartStorageKey(user);
  const [cartItems, setCartItems] = useState(() => getStoredCartItems(cartKey));

  useEffect(() => {
    setCartItems(getStoredCartItems(cartKey));
  }, [cartKey]);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id,
    );
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, quantity } : item,
      );
      setCartItems(updatedItems);
    } else {
      setCartItems((prevItems) => [...prevItems, { product, quantity }]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.precio * item.quantity,
      0,
    );
  };

  const getCantidadActual = (productId) => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCantidadActual,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
