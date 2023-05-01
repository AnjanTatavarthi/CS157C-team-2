package com.example.hotelamenitymanagementsystem.object;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Amenity {
    private String amenityId;
    private String name;
    private String description;
    private String location;
    private String openHours;
    private Boolean status;
}



