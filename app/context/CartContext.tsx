"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (product: any, size: string) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.id === product.id && item.selectedSize === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [
        ...prev,
        { 
          ...product, 
          selectedSize: size, 
          quantity: 1, 
          cartId: Math.random() 
        },
      ];
    });
    setIsOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // --- [ADDITION 1: Update Quantity Function] ---
  // This goes right after removeFromCart
  const updateQuantity = (cartId: any, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // --- [ADDITION 2: Clear Cart Function] ---
  // This helps reset the cart on the Success page
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      // --- [ADDITION 3: Registering the values] ---
      // We add the names here so the rest of the app can "see" them
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        isOpen, 
        setIsOpen 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);