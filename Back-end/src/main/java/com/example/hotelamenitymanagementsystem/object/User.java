package com.example.hotelamenitymanagementsystem.object;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String password;
    private String email;
    private String role;
}



