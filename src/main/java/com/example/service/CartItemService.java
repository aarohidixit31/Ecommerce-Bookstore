package com.example.service;

import com.example.exception.CartItemException;
import com.example.exception.UserException;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Product;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Long userId,Long id,CartItem cartItem) throws CartItemException,UserException;
    public CartItem isCartItemExists(Cart cart,Product product,Long userId);
    public void removeCartitem(Long userId,Long cartItemId) throws CartItemException,UserException;
    public CartItem findCartItemById(Long CartItemId) throws CartItemException;
    
}
