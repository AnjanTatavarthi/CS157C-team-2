package com.example.hotelamenitymanagementsystem.Dao;


import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


/**
 * For Basic operations you can leverage on Interface only repository
 */
@Repository
public interface AmenityBookingRepositoryCassandra extends CassandraRepository<AmenityBookingEntity, UUID> {

}