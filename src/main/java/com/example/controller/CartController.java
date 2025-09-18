package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exception.ProductException;
import com.example.exception.UserException;
import com.example.model.Cart;
import com.example.model.User;
import com.example.request.AddItemRequest;
import com.example.response.ApiResponse;
import com.example.service.CartService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private CartService cartService;
    private UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req,
            @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), req);
        
        ApiResponse res = new ApiResponse();
        res.setMessage("Item added to cart");
        res.setStatus(true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}