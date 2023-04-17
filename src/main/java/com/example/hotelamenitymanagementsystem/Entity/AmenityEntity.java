package com.example.hotelamenitymanagementsystem.Entity;

import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.CassandraType.Name;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(value = AmenityEntity.TABLE_NAME)
public class AmenityEntity {

    public static final String TABLE_NAME = "amenities";
    public static final String COLUMN_AMENITY_ID = "amenity_id";
    public static final String COLUMN_NAME = "name";
    public static final String COLUMN_DESCRIPTION = "description";
    public static final String COLUMN_IMAGE = "image";
    public static final String COLUMN_LOCATION = "location";
    public static final String COLUMN_HOURS_AVAIL = "hours_avail";
    public static final String COLUMN_STATUS = "status";
    

    @PrimaryKey
    @Column(COLUMN_AMENITY_ID)
    @CassandraType(type = Name.UUID)
    private UUID amenityId;

    @Column(COLUMN_NAME)
    @CassandraType(type = Name.TEXT)
    private String name;

    @Column(COLUMN_DESCRIPTION)
    @CassandraType(type = Name.TEXT)
    private String description;

    @Column(COLUMN_LOCATION)
    @CassandraType(type = Name.TEXT)
    private String location;

    @Column(COLUMN_HOURS_AVAIL)
    @CassandraType(type = Name.TEXT)
    private String hoursAvail;

    @Column(COLUMN_STATUS)
    @CassandraType(type = Name.TEXT)
    private String status;

}
