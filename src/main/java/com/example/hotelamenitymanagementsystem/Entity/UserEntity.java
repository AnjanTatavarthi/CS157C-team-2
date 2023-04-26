package com.example.hotelamenitymanagementsystem.Entity;

import org.springframework.data.cassandra.core.mapping.*;
import org.springframework.data.cassandra.core.mapping.CassandraType.Name;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(value = UserEntity.TABLE_NAME)
public class UserEntity {

    public static final String TABLE_NAME = "user";
    public static final String COLUMN_FIRST_NAME = "first_name";
    public static final String COLUMN_MIDDLE_NAME = "middle_name";
    public static final String COLUMN_LAST_NAME = "last_name";
    public static final String COLUMN_PASSWORD = "password";
    public static final String COLUMN_EMAIL = "email";
    public static final String COLUMN_DATE_OF_BIRTH = "data_of_birth";
    public static final String COLUMN_ROLE = "role";
    public static final String ADDRESS = "address";

    @Column(COLUMN_FIRST_NAME)
    @CassandraType(type = Name.TEXT)
    private String firstName;

    @Column(COLUMN_LAST_NAME)
    @CassandraType(type = Name.TEXT)
    private String lastName;

    @Column(COLUMN_PASSWORD)
    @CassandraType(type = Name.TEXT)
    private String password;

    @PrimaryKey
    @Column(COLUMN_EMAIL)
    @CassandraType(type = Name.TEXT)
    private String email;

    @Column(COLUMN_DATE_OF_BIRTH)
    @CassandraType(type = Name.DATE)
    private LocalDate dateOfBirth;

    @Column(COLUMN_ROLE)
    @CassandraType(type = Name.TEXT)
    private String role;

}