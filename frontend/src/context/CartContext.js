import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      // Try backend first
      const response = await axios.get('/api/cart/');
      setCartItems(response.data.cartItems || []);
    } catch (error) {
      console.error('Backend cart failed, using mock data:', error);
      // Load from localStorage for mock functionality
      const savedCart = localStorage.getItem(`cart_${user?.id}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return { success: false };
    }

    try {
      setLoading(true);
      // Try backend first
      await axios.put('/api/cart/add', {
        productId: product.id,
        quantity: quantity
      });
      
      // Reload cart from backend
      await loadCart();
      return { success: true };
    } catch (error) {
      console.error('Backend add to cart failed, using mock:', error);
      
      // Mock cart functionality
      const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
      let updatedCart;
      
      if (existingItemIndex >= 0) {
        // Update existing item
        updatedCart = cartItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem = {
          id: Date.now(),
          product: product,
          quantity: quantity,
          price: product.discountedPrice || product.price
        };
        updatedCart = [...cartItems, newItem];
      }
      
      setCartItems(updatedCart);
      // Save to localStorage
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
      
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      // Try backend first
      await axios.delete(`/api/cart/cartItems/${itemId}`);
      await loadCart();
    } catch (error) {
      console.error('Backend remove failed, using mock:', error);
      
      // Mock remove functionality
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      setLoading(true);
      // Try backend first
      await axios.put(`/api/cart/cartItems/${itemId}`, {
        quantity: newQuantity
      });
      await loadCart();
    } catch (error) {
      console.error('Backend update failed, using mock:', error);
      
      // Mock update functionality
      const updatedCart = cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      // Try backend first
      await axios.delete('/api/cart/clear');
      setCartItems([]);
    } catch (error) {
      console.error('Backend clear failed, using mock:', error);
      
      // Mock clear functionality
      setCartItems([]);
      localStorage.removeItem(`cart_${user.id}`);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    loadCart
  };



  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};