package com.example.service;

import org.springframework.stereotype.Service;

import com.example.exception.ProductException;
import com.example.model.Cart;
import com.example.model.CartItem;
import com.example.model.Product;
import com.example.model.User;
import com.example.repository.CartRepository;
import com.example.request.AddItemRequest;


@Service
public class CartServiceImplementation implements CartService {

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public CartServiceImplementation(CartRepository cartRepository, CartItemService cartItemService,
            ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

     @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
       Cart cart=cartRepository.findByUserId(userId);
       Product product=productService.findProductById(req.getProductId());
       CartItem isPresent=cartItemService.isCartItemExists(cart, product, userId);
       if(isPresent==null)
       {
         CartItem cartItem=new CartItem();
         cartItem.setProduct(product);
         cartItem.setQuantity(req.getQuantity());
         cartItem.setUserId(userId);

         int price=req.getQuantity()*product.getDiscountedPrice();
         cartItem.setPrice(price);

         CartItem createdCartitem=cartItemService.createCartItem(cartItem);
         cart.getCartitems().add(createdCartitem);

       }
       return "Item added to cart";
    }

    @Override
    public Cart findUserCart(Long userId) {
       Cart cart=cartRepository.findByUserId(userId);
       int totalPrice=0;
       int totalDiscountedPrice=0;
       int totalItem=0;

       for(CartItem cartitem:cart.getCartitems())
       {
         totalPrice+=cartitem.getPrice();
         totalDiscountedPrice+=cartitem.getDiscountedPrice();
         totalItem+=cartitem.getQuantity();
       }

       cart.setTotalDiscountedPrice(totalDiscountedPrice);
       cart.setTotalItem(totalItem);
       cart.setTotalPrice(totalPrice);
       cart.setDiscount(totalPrice-totalDiscountedPrice);

       return cartRepository.save(cart);
    }
    
}
