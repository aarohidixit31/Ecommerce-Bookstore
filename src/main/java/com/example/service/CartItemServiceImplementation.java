package com.example.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.exception.CartItemException;
import com.example.exception.UserException;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Product;
import com.example.model.User;
import com.example.repository.CartItemRepository;
import com.example.repository.CartRepository;

@Service
public class CartItemServiceImplementation implements CartItemService {
    
    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    

    public CartItemServiceImplementation() {
    }

    public CartItemServiceImplementation(CartItemRepository cartItemRepository, UserService userService,
            CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getProduct().getPrice()*cartItem.getQuantity());
        cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice()*cartItem.getQuantity());
        CartItem createdCartItem=cartItemRepository.save(cartItem);
        return createdCartItem;

       }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
       CartItem item=findCartItemById(id);
       User user=userService.findUserById(item.getUserId());
       if(user.getId().equals(userId))
       {
         item.setQuantity(item.getQuantity());
         item.setPrice(item.getQuantity()*item.getProduct().getPrice());
         item.setDiscountedPrice(item.getProduct().getDiscountedPrice()*item.getQuantity());
       }
       return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExists(Cart cart, Product product, Long userId) {
       
        CartItem cartItem=cartItemRepository.isCartItemExists(cart, product, userId);
        return cartItem;
    }

    @Override
    public void removeCartitem(Long userId, Long cartItemId) throws CartItemException, UserException {
       CartItem cartItem=findCartItemById(cartItemId);
       User user=userService.findUserById(cartItem.getId());
       User reqUser=userService.findUserById(userId);
       if(user.getId().equals(reqUser.getId()))
       {
         cartItemRepository.deleteById(cartItemId);
       }
       else
       {
         throw new UserException("You can't remove anothers usersItem ");
       }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
      Optional<CartItem> opt=cartItemRepository.findById(cartItemId);
      if(opt.isPresent())
      {
        return opt.get();
      }
      throw new CartItemException("CartItem not found");
    }
    
}
