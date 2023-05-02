package com.example.hotelamenitymanagementsystem.Dao;

import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntityById;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface AmenityBookingByIdRepositoryCassandra extends CassandraRepository<AmenityBookingEntityById, UUID> {

}