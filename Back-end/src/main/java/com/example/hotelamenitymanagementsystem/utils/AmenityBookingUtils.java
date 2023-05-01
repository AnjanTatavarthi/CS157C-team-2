package com.example.hotelamenitymanagementsystem.utils;

import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.object.AmenityBooking;

import java.util.UUID;

public class AmenityBookingUtils {

    private AmenityBookingUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static AmenityBooking mapAsAmenityBooking(AmenityBookingEntity amenityBookingEntity) {
        return AmenityBooking.builder()
                .amenityId(amenityBookingEntity.getAmenityId().toString())
                .bookingDateTime(amenityBookingEntity.getBookingDateTime())
                .userEmail(amenityBookingEntity.getUserEmail())
                .bookingId(amenityBookingEntity.getBookingId().toString())
                .build();
    }

    public static AmenityBookingEntity mapAsAmenityBookingEntity(AmenityBooking amenityBooking) {
        return AmenityBookingEntity.builder()
                .amenityId(UUID.fromString(amenityBooking.getAmenityId()))
                .bookingDateTime(amenityBooking.getBookingDateTime())
                .userEmail(amenityBooking.getUserEmail())
                .bookingId(amenityBooking.getBookingId() != null ? UUID.fromString(amenityBooking.getBookingId()) : null)
                .build();
    }
}
