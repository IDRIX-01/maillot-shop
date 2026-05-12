import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
  setCart((prev) => {
    const newItem = {
      id: item.id || Date.now(), 
      name: item.name || "Produit",
      image: item.image || "",
      size: item.size || "",
      type: item.type || "",   
      year: item.year || "",   
      playerName: item.playerName || "",
      playerNumber: item.playerNumber || "",
      quantity: item.quantity || 1,
      price: item.price || 0,
    };

    return [...prev, newItem];
  });
};
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
