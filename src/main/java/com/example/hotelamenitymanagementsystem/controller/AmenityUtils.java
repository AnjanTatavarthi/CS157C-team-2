package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Entity.AmenityEntity;
import com.example.hotelamenitymanagementsystem.object.Amenity;

public class AmenityUtils {

    private AmenityUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static Amenity mapAsAmenity(AmenityEntity e) {
        return new Amenity(
                e.getAmenityId().toString(),
                e.getName(),
                e.getDescription(),
                e.getImage(),
                e.getLocation(),
                e.getHoursAvail(),
                e.getStatus()
        );
    }

    public static AmenityEntity mapAsAmenityEntity(Amenity amenity) {
        AmenityEntity e = new AmenityEntity();
        e.setAmenityId(amenity.getAmenityId() != null ? UUID.fromString(amenity.getAmenityId()) : null);
        e.setName(amenity.getName());
        e.setDescription(amenity.getDescription());
        e.setImage(amenity.getImage());
        e.setLocation(amenity.getLocation());
        e.setHoursAvail(amenity.getHoursAvail());
        e.setStatus(amenity.getStatus());
        return e;
    }
}
