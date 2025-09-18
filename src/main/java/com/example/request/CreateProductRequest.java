package com.example.request;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.model.Category;
import com.example.model.Format;
import com.example.model.Rating;
import com.example.model.Review;

public class CreateProductRequest {
    private String title;
    private String description;
    private String author;
    private int price;
    private int discountedPrice;
    private Category category;
    private int discountPercent;
    private String publisher;
    private String imageUrl;
    private String language;
    private int quantity;
    private List<Format> formats = new ArrayList<>();

    // Added fields from Product
    private List<Rating> ratings = new ArrayList<>();
    private List<Review> reviews = new ArrayList<>();
    private int numRatings;
    private LocalDateTime createdAt;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String name) { this.title = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(int discountedPrice) { this.discountedPrice = discountedPrice; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public List<Format> getFormats() { return formats; }
    public void setFormats(List<Format> formats) { this.formats = formats; }

    public List<Rating> getRatings() { return ratings; }
    public void setRatings(List<Rating> ratings) { this.ratings = ratings; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public int getNumRatings() { return numRatings; }
    public void setNumRatings(int numRatings) { this.numRatings = numRatings; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

}
