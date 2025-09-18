package com.example.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.exception.ProductException;
import com.example.model.Product;
import com.example.request.CreateProductRequest;

public interface ProductService {
    Product createProduct(CreateProductRequest req);
    String deleteProduct(Long productId) throws ProductException;
    Product updateProduct(Long productId, Product req) throws ProductException;
    Product findProductById(Long id) throws ProductException;
    List<Product> findProductByCategory(String category);
    Page<Product> getAllProduct(String category, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort,String stock, Integer pageNumber, Integer pageSize);
}
