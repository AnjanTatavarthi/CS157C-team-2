package com.example.hotelamenitymanagementsystem.object;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class LoginResponse {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String email;
    private String role;
    private Boolean success;
}
