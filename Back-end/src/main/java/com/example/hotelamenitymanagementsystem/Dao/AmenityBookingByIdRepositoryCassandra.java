package com.example.hotelamenitymanagementsystem.Dao;

import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntityById;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;


@Repository
public interface AmenityBookingByIdRepositoryCassandra extends CassandraRepository<AmenityBookingEntityById, UUID> {

    @Query("SELECT * FROM bookings_by_id WHERE user_email = ?0")
    List<AmenityBookingEntityById> findByEmail(String email);

}