package com.example.hotelamenitymanagementsystem.Entity;

import org.springframework.data.cassandra.core.mapping.*;
import org.springframework.data.cassandra.core.mapping.CassandraType.Name;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(value = ServiceRequestEntity .TABLE_NAME)
public class ServiceRequestEntity {

    public static final String TABLE_NAME = "service_requests";
    public static final String COLUMN_REQUEST_ID = "request_id";
    public static final String COLUMN_AMENITY_ID = "amenity_id";
    public static final String COLUMN_GUEST_EMAIL = "guest_email";
    public static final String COLUMN_COMMENTS = "comments";
    public static final String COLUMN_STATUS = "status";
    public static final String COLUMN_ASSIGNED_STAFF = "assigned_staff";

    @PrimaryKey
    @Column(COLUMN_REQUEST_ID)
    @CassandraType(type = Name.UUID)
    private UUID requestId;

    @Column(COLUMN_AMENITY_ID)
    @CassandraType(type = Name.TEXT)
    private String amenityId;

    @Column(COLUMN_GUEST_EMAIL)
    @CassandraType(type = Name.TEXT)
    private String guestEmail;

    @Column(COLUMN_COMMENTS)
    @CassandraType(type = Name.TEXT)
    private String comments;

    @Column(COLUMN_STATUS)
    @CassandraType(type = Name.TEXT)
    private String status;

    @Column(COLUMN_ASSIGNED_STAFF)
    @CassandraType(type = Name.TEXT)
    private String assignedStaff;

}
