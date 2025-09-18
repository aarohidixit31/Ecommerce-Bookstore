package com.example.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.exception.UserException;
import com.example.model.PaymentInformation;
import com.example.model.User;
import com.example.response.ApiResponse;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private UserService userService;

    public PaymentController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addPaymentInformation(@RequestBody PaymentInformation paymentInfo,
            @RequestHeader("Authorization") String jwt) throws UserException {
        
        User user = userService.findUserProfileByJwt(jwt);
        user.getPaymentInformation().add(paymentInfo);
        
        // In a real application, you would save this to the database
        // userService.updateUser(user);
        
        ApiResponse res = new ApiResponse();
        res.setMessage("Payment information added successfully");
        res.setStatus(true);
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<java.util.List<PaymentInformation>> getUserPaymentInformation(
            @RequestHeader("Authorization") String jwt) throws UserException {
        
        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user.getPaymentInformation(), HttpStatus.OK);
    }
}