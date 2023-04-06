package com.example.hotelamenitymanagementsystem.object;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String user_name;
    private String password;
    private String email;

}
