package com.example.hotelamenitymanagementsystem.utils;

import com.datastax.oss.driver.api.core.uuid.Uuids;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntityById;
import com.example.hotelamenitymanagementsystem.object.AmenityBooking;

import java.util.UUID;

public class AmenityBookingUtils {

    private AmenityBookingUtils() {
        throw new IllegalStateException("Utility class");
    }

    public static AmenityBooking mapAsAmenityBooking(AmenityBookingEntityById amenityBookingEntity) {
        return AmenityBooking.builder()
                .amenityId(amenityBookingEntity.getAmenityId())
                .bookingDate(amenityBookingEntity.getBookingDate())
                .bookingTime(amenityBookingEntity.getBookingTime())
                .userEmail(amenityBookingEntity.getUserEmail())
                .bookingId(amenityBookingEntity.getBookingId().toString())
                .amenityName(amenityBookingEntity.getAmenityName())
                .canceled(amenityBookingEntity.getCanceled())
                .amenityName(amenityBookingEntity.getAmenityName())
                .build();
    }

    public static AmenityBooking mapAsAmenityBooking(AmenityBookingEntity amenityBookingEntity) {
        return AmenityBooking.builder()
                .amenityId(amenityBookingEntity.getAmenityId())
                .bookingDate(amenityBookingEntity.getBookingDate())
                .bookingTime(amenityBookingEntity.getBookingTime())
                .userEmail(amenityBookingEntity.getUserEmail())
                .bookingId(amenityBookingEntity.getBookingId().toString())
                .amenityName(amenityBookingEntity.getAmenityName())
                .canceled(amenityBookingEntity.getCanceled())
                .amenityName(amenityBookingEntity.getAmenityName())
                .build();
    }

    public static AmenityBookingEntityById mapAsAmenityBookingEntityId(AmenityBooking amenityBooking) {
        return AmenityBookingEntityById.builder()
                .amenityId(amenityBooking.getAmenityId())
                .amenityName(amenityBooking.getAmenityName())
                .bookingDate(amenityBooking.getBookingDate())
                .bookingTime(amenityBooking.getBookingTime())
                .userEmail(amenityBooking.getUserEmail())
                .bookingId(amenityBooking.getBookingId() != null ? UUID.fromString(amenityBooking.getBookingId()) : Uuids.random())
                .canceled(amenityBooking.getCanceled() != null ? amenityBooking.getCanceled() : Boolean.FALSE)
                .amenityName(amenityBooking.getAmenityName())
                .build();
    }

    public static AmenityBookingEntity mapAsAmenityBookingEntity(AmenityBooking amenityBooking) {
        return AmenityBookingEntity.builder()
                .amenityId(amenityBooking.getAmenityId())
                .amenityName(amenityBooking.getAmenityName())
                .bookingDate(amenityBooking.getBookingDate())
                .bookingTime(amenityBooking.getBookingTime())
                .userEmail(amenityBooking.getUserEmail())
                .bookingId(amenityBooking.getBookingId() != null ? UUID.fromString(amenityBooking.getBookingId()) : Uuids.random())
                .canceled(amenityBooking.getCanceled() != null ? amenityBooking.getCanceled() : Boolean.FALSE)
                .amenityName(amenityBooking.getAmenityName())
                .build();
    }

    public static AmenityBookingEntity convertToBookingEntity(AmenityBookingEntityById amenityBookingById) {
        return AmenityBookingEntity.builder()
                .amenityId(amenityBookingById.getAmenityId())
                .amenityName(amenityBookingById.getAmenityName())
                .bookingDate(amenityBookingById.getBookingDate())
                .bookingTime(amenityBookingById.getBookingTime())
                .userEmail(amenityBookingById.getUserEmail())
                .bookingId(amenityBookingById.getBookingId())
                .canceled(amenityBookingById.getCanceled())
                .amenityName(amenityBookingById.getAmenityName())
                .build();
    }
}