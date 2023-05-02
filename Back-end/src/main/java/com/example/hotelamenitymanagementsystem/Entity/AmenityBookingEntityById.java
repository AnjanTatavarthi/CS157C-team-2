package com.example.hotelamenitymanagementsystem.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.*;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(value = AmenityBookingEntityById.TABLE_NAME)
public class AmenityBookingEntityById {
    public static final String TABLE_NAME = "bookings_by_id";
    public static final String COLUMN_BOOKING_ID = "booking_id";
    public static final String COLUMN_USER_EMAIL = "user_email";
    public static final String COLUMN_BOOKING_DATE = "booking_date";
    public static final String COLUMN_BOOKING_TIME = "booking_time";
    public static final String COLUMN_AMENITY_ID = "amenity_id";

    @PrimaryKey
    @Column(COLUMN_BOOKING_ID)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID bookingId;

    @Column(COLUMN_USER_EMAIL)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String userEmail;

    @Column(COLUMN_BOOKING_DATE)
    @CassandraType(type = CassandraType.Name.DATE)
    private LocalDate bookingDate;

    @Column(COLUMN_BOOKING_TIME)
    @CassandraType(type = CassandraType.Name.TIME)
    private LocalTime bookingTime;

    @Column(COLUMN_AMENITY_ID)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String amenityId;
}

