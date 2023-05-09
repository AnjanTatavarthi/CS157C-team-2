package com.example.hotelamenitymanagementsystem.Dao;


import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntityById;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


/**
 * For Basic operations you can leverage on Interface only repository
 */
@Repository
public interface AmenityBookingRepositoryCassandra extends CassandraRepository<AmenityBookingEntity, UUID> {
    @Query("SELECT * FROM bookings WHERE amenity_id = ?0 AND booking_date = ?1 AND canceled = false")
    List<AmenityBookingEntity> findByAmenityIdAndBookingDate(String amenityId, LocalDate bookingDate);

    @Query("SELECT * FROM bookings WHERE canceled = true")
    List<AmenityBookingEntity> getCanceledBookings();

    @Query("SELECT * FROM bookings WHERE canceled = false")
    List<AmenityBookingEntity> getConfirmedBooking();
}