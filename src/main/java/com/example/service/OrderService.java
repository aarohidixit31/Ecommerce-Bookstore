package com.example.service;

import java.util.List;

import com.example.exception.OrderException;
import com.example.model.Order;

public interface OrderService  {

    public Order placedOrder(Long orderId) throws OrderException;
    public Order confirmedOrder(Long orderId) throws OrderException;
    public Order shippedOrder(Long orderId) throws OrderException;
    public Order deliveredOrdered(Long orderId) throws OrderException;
    public Order cancelledOrder(Long orderId) throws OrderException;
    public List<Order> getAllOrders();
    public void deleteOrder(Long orderId) throws OrderException;
    
    
}
