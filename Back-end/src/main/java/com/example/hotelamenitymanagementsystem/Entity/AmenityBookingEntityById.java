package com.example.hotelamenitymanagementsystem.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
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
    public static final String COLUMN_AMENITY_NAME = "amenity_name";
    public static final String COLUMN_AMENITY_ID = "amenity_id";
    public static final String COLUMN_CANCELED = "canceled";

    @PrimaryKeyColumn(name = COLUMN_BOOKING_ID, ordinal = 1, type = PrimaryKeyType.CLUSTERED)
    @CassandraType(type = CassandraType.Name.UUID)
    private UUID bookingId;

    @PrimaryKeyColumn(name = COLUMN_USER_EMAIL, ordinal = 0, type = PrimaryKeyType.PARTITIONED)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String userEmail;

    @Column(COLUMN_BOOKING_DATE)
    @CassandraType(type = CassandraType.Name.DATE)
    private LocalDate bookingDate;

    @Column(COLUMN_BOOKING_TIME)
    @CassandraType(type = CassandraType.Name.LIST, typeArguments = CassandraType.Name.TIME)
    private List<LocalTime> bookingTime;

    @Column(COLUMN_AMENITY_ID)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String amenityId;

    @Column(COLUMN_AMENITY_NAME)
    @CassandraType(type = CassandraType.Name.TEXT)
    private String amenityName;

    @Column(COLUMN_CANCELED)
    @CassandraType(type = CassandraType.Name.BOOLEAN)
    private Boolean canceled;
}

