package com.example.hotelamenitymanagementsystem.object;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RegistrationResponse {
    private Boolean success;
    private String errorMessage;
}
