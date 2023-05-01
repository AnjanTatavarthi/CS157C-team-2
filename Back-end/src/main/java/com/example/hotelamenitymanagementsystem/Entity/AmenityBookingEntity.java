package com.example.hotelamenitymanagementsystem.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(value = AmenityEntity.TABLE_NAME)
public class AmenityBookingEntity {
    public static final String TABLE_NAME = "bookings";
    public static final String COLUMN_BOOKING_ID = "booking_id";
    public static final String COLUMN_USER_EMAIL = "user_email";
    public static final String COLUMN_BOOKING_DATE_TIME = "booking_date_time";
    public static final String AMENITY_ID = "amenity_id";

    @PrimaryKey
    @Column(COLUMN_BOOKING_ID)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID bookingId;

    @Column(COLUMN_USER_EMAIL)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String userEmail;

    @Column(COLUMN_BOOKING_DATE_TIME)
    @CassandraType(type = CassandraType.Name.TIME)
    private LocalDate bookingDateTime;

    @Column(AMENITY_ID)
    @CassandraType(type = CassandraType.Name.TEXT)
    private UUID amenityId;
}

