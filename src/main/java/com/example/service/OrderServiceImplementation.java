package com.example.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.exception.OrderException;
import com.example.model.Order;
import com.example.repository.CartRepository;

@Service
public class OrderServiceImplementation implements  OrderService{
    

    private CartRepository cartRepository;
    private CartService cartItemService;
    private ProductService productService;
    

    public OrderServiceImplementation(CartRepository cartRepository, CartService cartItemService,
            ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    public OrderServiceImplementation() {
    }

    @Override
    public Order placedOrder(Long orderId) throws OrderException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Order deliveredOrdered(Long orderId) throws OrderException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Order cancelledOrder(Long orderId) throws OrderException {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public List<Order> getAllOrders() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
