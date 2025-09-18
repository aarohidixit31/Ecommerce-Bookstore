package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exception.ProductException;
import com.example.exception.UserException;
import com.example.model.Rating;
import com.example.model.User;
import com.example.request.RatingRequest;
import com.example.service.RatingService;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private RatingService ratingService;
    private UserService userService;

    public RatingController(RatingService ratingService, UserService userService) {
        this.ratingService = ratingService;
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req,
            @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        
        User user = userService.findUserProfileByJwt(jwt);
        Rating rating = ratingService.createRating(req, user);
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductsRating(@PathVariable Long productId) {
        List<Rating> ratings = ratingService.getProductsRating(productId);
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }
}