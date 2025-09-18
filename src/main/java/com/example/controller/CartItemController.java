package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exception.CartItemException;
import com.example.exception.UserException;
import com.example.model.CartItem;
import com.example.model.User;
import com.example.response.ApiResponse;
import com.example.service.CartItemService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    private CartItemService cartItemService;
    private UserService userService;

    public CartItemController(CartItemService cartItemService, UserService userService) {
        this.cartItemService = cartItemService;
        this.userService = userService;
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {
        
        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartitem(user.getId(), cartItemId);
        
        ApiResponse res = new ApiResponse();
        res.setMessage("Item removed from cart");
        res.setStatus(true);
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem, @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt) throws UserException, CartItemException {
        
        User user = userService.findUserProfileByJwt(jwt);
        CartItem updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
        
        return new ResponseEntity<>(updatedCartItem, HttpStatus.OK);
    }
}