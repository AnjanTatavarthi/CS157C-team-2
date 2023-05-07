package com.example.hotelamenitymanagementsystem.Dao;


import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.Entity.AmenityEntity;
import com.example.hotelamenitymanagementsystem.Entity.ServiceRequestEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * For Basic operations you can leverage on Interface only repository
 */
@Repository
public interface ServiceRequestRepositoryCassandra extends CassandraRepository<ServiceRequestEntity, UUID> {

    @Query("SELECT * FROM service_requests WHERE guest_email = ?0")
    List<ServiceRequestEntity> findByGuestEmail(String guestEmail);


    @Query("SELECT * FROM service_requests WHERE assigned_staff = ?0")
    List<ServiceRequestEntity> findByAssignedStaff(String assignedStaff);
}