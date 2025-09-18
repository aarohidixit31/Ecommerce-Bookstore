package com.example.controller;

import java.util.List;
import org.springframework.data.domain.Page; // Added import for Page
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.exception.ProductException; // Corrected to ProductException
import com.example.model.Product;
import com.example.service.ProductService;


@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService; // Made final for constructor injection

    // Corrected constructor for dependency injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products") // Corrected mapping to not have a sub-path
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(@RequestParam String category,
        @RequestParam(required = false) Integer minPrice, // Added required = false
        @RequestParam(required = false) Integer maxPrice, // Added required = false
        @RequestParam(required = false) Integer minDiscount, // Added required = false
        @RequestParam(required = false) String sort, // Added required = false
        @RequestParam(required = false) String stock, // Added required = false
        @RequestParam Integer pageNumber,
        @RequestParam Integer pageSize) {
        
        // This method was empty. It now calls the service and returns a response.
        Page<Product> products = productService.getAllProduct(
            category,
            minPrice,
            maxPrice,
            minDiscount,
            sort,
            stock,
            pageNumber,
            pageSize
        );

        return new ResponseEntity<>(products, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("products/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
        // Corrected variable name from ProductId to productId
        Product product = productService.findProductById(productId);
        return new ResponseEntity<>(product, HttpStatus.ACCEPTED);
    }

   
}