package com.example.hotelamenitymanagementsystem.Dao;




import com.example.hotelamenitymanagementsystem.Entity.AmenityEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

/**
 * For Basic operations you can leverage on Interface only repository
 */
@Repository
public interface AmenityRepositoryCassandra extends CassandraRepository<AmenityEntity, String> {

}