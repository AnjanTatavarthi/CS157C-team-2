package com.example.hotelamenitymanagementsystem.utils;

import com.example.hotelamenitymanagementsystem.Entity.AmenityEntity;
import com.example.hotelamenitymanagementsystem.object.Amenity;

import java.util.UUID;

public class AmenityUtils {
    private AmenityUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static Amenity mapAsAmenity(AmenityEntity amenityEntity) {
        return new Amenity(
                amenityEntity.getAmenityId().toString(),
                amenityEntity.getName(),
                amenityEntity.getDescription(),
                amenityEntity.getLocation(),
                amenityEntity.getOpenHours(),
                amenityEntity.getStatus(),
                amenityEntity.getImageUrl()
        );
    }

    public static AmenityEntity mapAsAmenityEntity(Amenity amenity) {
        AmenityEntity amenityEntity = new AmenityEntity();
        amenityEntity.setAmenityId(UUID.randomUUID());
        amenityEntity.setName(amenity.getName());
        amenityEntity.setDescription(amenity.getDescription());
        amenityEntity.setLocation(amenity.getLocation());
        amenityEntity.setOpenHours(amenity.getOpenHours());
        amenityEntity.setStatus(amenity.getStatus());
        amenityEntity.setImageUrl(amenity.getImageUrl());
        return amenityEntity;
    }
}
