package com.example.hotelamenitymanagementsystem.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;
import org.springframework.data.cassandra.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(value = AmenityBookingEntity.TABLE_NAME)
public class AmenityBookingEntity {
    public static final String TABLE_NAME = "bookings";
    public static final String COLUMN_BOOKING_ID = "booking_id";
    public static final String COLUMN_USER_EMAIL = "user_email";
    public static final String COLUMN_BOOKING_DATE = "booking_date";
    public static final String COLUMN_BOOKING_TIME = "booking_time";
    public static final String COLUMN_AMENITY_ID = "amenity_id";


    @PrimaryKeyColumn(name = COLUMN_BOOKING_ID, ordinal = 2, type = PrimaryKeyType.CLUSTERED)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID bookingId;

    @Column(COLUMN_USER_EMAIL)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String userEmail;

    @PrimaryKeyColumn(name = COLUMN_BOOKING_DATE, ordinal = 1, type = PrimaryKeyType.PARTITIONED)
    @CassandraType(type = CassandraType.Name.DATE)
    private LocalDate bookingDate;

    @Column(COLUMN_BOOKING_TIME)
    @CassandraType(type = CassandraType.Name.LIST, typeArguments = CassandraType.Name.TIME)
    private List<LocalTime> bookingTime;

    @PrimaryKeyColumn(name = COLUMN_AMENITY_ID, ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String amenityId;
}

