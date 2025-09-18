package com.example.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.exception.ProductException;
import com.example.model.Category;
import com.example.model.Product;
import com.example.repository.CategoryRepository;
import com.example.repository.ProductRepository;
import com.example.request.CreateProductRequest;

@Service
public class ProductServiceImplementation implements ProductService{

    private ProductRepository productRepository;
    private UserService userService;
    private CategoryRepository categoryRepository;

    

    public ProductServiceImplementation(ProductRepository productRepository, UserService userService,
            CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.categoryRepository = categoryRepository;
    }



    public ProductServiceImplementation() {
    }

    

    @Override
    public Product createProduct(CreateProductRequest req) {
        Category name=categoryRepository.findByName(req.getCategory().getName());
        if(name==null)
        {
           name=new Category();
            name.setName(req.getCategory().getName());
            name=categoryRepository.save(name);
        }

        Product product=new Product();
        product.setTitle(req.getTitle());
        product.setDescription(req.getDescription());
        product.setAuthor(req.getAuthor());
        product.setPrice(req.getPrice());
        product.setDiscountedPrice(req.getDiscountedPrice());
        product.setDiscountPercent(req.getDiscountPercent());
        product.setPublisher(req.getPublisher());
        product.setImageUrl(req.getImageUrl());
        product.setLanguage(req.getLanguage());
        product.setQuantity(req.getQuantity());
        product.setFormats(req.getFormats());
        product.setRatings(req.getRatings());
        product.setReviews(req.getReviews());
        product.setNumRatings(req.getNumRatings());
        product.setCreatedAt(LocalDateTime.now());
        product.setCategory(name);

        Product savedProduct=productRepository.save(product);

        return savedProduct;   
    }

    @Override
    public String deleteProduct(Long productId) throws ProductException {
        Product product=findProductById(productId);
        productRepository.delete(product);
         return "Product with ID " + productId + " deleted successfully.";
    }

    @Override
    public List<Product> findProductByCategory(String category) {
        return productRepository.filterProducts(category, null, null, null,null);
    }



    @Override
    public Product findProductById(Long id) throws ProductException {
        Optional<Product> opt=productRepository.findById(id);
        if(opt.isPresent())
        {
            return opt.get();
        }
        throw new ProductException("Product not found with id - "+id);
        
    }

    @Override
    public Page<Product> getAllProduct(String category, Integer minPrice, Integer maxPrice, Integer minDiscount,
            String sort, String stock, Integer pageNumber, Integer pageSize) {
        
        Pageable pageable=PageRequest.of(pageNumber,pageSize);
        List<Product> products=productRepository.filterProducts(category, minPrice, maxPrice, minDiscount,sort);
        if(stock!=null)
        {
            if(stock.equals("in_stock"))
            {
                products=products.stream().filter(p->p.getQuantity()>0).collect(Collectors.toList());
            }
            else if(stock.equals("out_of_stock"))
            {
                products=products.stream().filter(p->p.getQuantity()<1).collect(Collectors.toList());
            }             
        }

        int startIndex=(int) pageable.getOffset();
        int endIndex=Math.min(startIndex+pageable.getPageSize(),products.size());
        List<Product> pageContent=products.subList(startIndex,endIndex);
        Page<Product> filteredProducts=new PageImpl<>(pageContent,pageable,products.size());
        return filteredProducts;
    }

    @Override
    public Product updateProduct(Long productId, Product req) throws ProductException {
        Product product1=findProductById(productId);
        if(req.getQuantity()!=0)
        {
            product1.setQuantity(req.getQuantity());
        }
        return productRepository.save(product1);
    }

    
}
