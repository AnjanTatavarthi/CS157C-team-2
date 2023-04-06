package com.example.hotelamenitymanagementsystem.Entity;



import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.CassandraType.Name;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(value = UserEntity.TABLENAME)
public class UserEntity {

    public static final String TABLENAME = "user";
    public static final String COLUMN_USER_NAME = "user_name";
    public static final String COLUMN_PASSWORD = "password";
    public static final String COLUMN_EMAIL = "email";

    @PrimaryKey
    @Column(COLUMN_USER_NAME)
    @CassandraType(type = Name.TEXT)
    private String user_name;

    @Column(COLUMN_PASSWORD)
    @CassandraType(type = Name.TEXT)
    private String password;

    @Column(COLUMN_EMAIL)
    @CassandraType(type = Name.TEXT)
    private String email;


}