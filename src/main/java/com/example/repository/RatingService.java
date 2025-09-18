package com.example.repository;

import com.example.exception.ProductException;
import com.example.model.Rating;
import com.example.model.User;

public interface RatingService {

    public Rating createRating(RatingRequest req,User user) throws ProductException;
    

    
}
