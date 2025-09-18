package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exception.ProductException;
import com.example.exception.UserException;
import com.example.model.Review;
import com.example.model.User;
import com.example.request.ReviewRequest;
import com.example.service.ReviewService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;
    private UserService userService;

    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest req,
            @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Review review = reviewService.createReview(req, user);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductsReview(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getAllReview(productId);
        return new ResponseEntity<>(reviews, HttpStatus.ACCEPTED);
    }
}