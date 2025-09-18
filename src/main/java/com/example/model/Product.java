package com.example.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private String author; // Added
    private int price;

    @Column(name = "discounted_price")
    private int discountedPrice;

    @Column(name = "discount_percent")
    private int discountPercent;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "image_url")
    private String imageUrl;

    private String language; // Optional if needed
    private String publisher; // Optional if needed

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @Column(name = "num_ratings")
    private int numRatings;

    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Category category;

    private LocalDateTime createdAt;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Format> formats = new ArrayList<>(); // Added

    public Product() {}

    // Full constructor
    public Product(Long id, String title, String description, String author, int price, int discountedPrice,
                   int discountPercent, int quantity, String imageUrl, String publisher, String language,
                   List<Rating> ratings, List<Review> reviews, int numRatings, Category category,
                   LocalDateTime createdAt, List<Format> formats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.discountPercent = discountPercent;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.publisher = publisher;
        this.language = language;
        this.ratings = ratings;
        this.reviews = reviews;
        this.numRatings = numRatings;
        this.category = category;
        this.createdAt = createdAt;
        this.formats = formats;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(int discountedPrice) { this.discountedPrice = discountedPrice; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public List<Rating> getRatings() { return ratings; }
    public void setRatings(List<Rating> ratings) { this.ratings = ratings; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public int getNumRatings() { return numRatings; }
    public void setNumRatings(int numRatings) { this.numRatings = numRatings; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<Format> getFormats() { return formats; }
    public void setFormats(List<Format> formats) { this.formats = formats; }
	

}
