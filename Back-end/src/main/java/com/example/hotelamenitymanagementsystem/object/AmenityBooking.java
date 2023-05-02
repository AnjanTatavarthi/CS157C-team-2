package com.example.hotelamenitymanagementsystem.object;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmenityBooking {
    private String bookingId;
    private String userEmail;
    private LocalDate bookingDate;
    private LocalTime bookingTime;
    private String amenityId;
}

