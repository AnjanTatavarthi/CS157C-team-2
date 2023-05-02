package com.example.hotelamenitymanagementsystem.Dao;




import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

/**
 * For Basic operations you can leverage on Interface only repository
 */
@Repository
public interface UserRepositoryCassandra extends CassandraRepository<UserEntity, String> {

}