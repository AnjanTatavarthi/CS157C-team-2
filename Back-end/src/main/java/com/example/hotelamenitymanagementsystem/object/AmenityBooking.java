package com.example.hotelamenitymanagementsystem.object;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AmenityBooking {
    private String bookingId;
    private String userEmail;
    private LocalDate bookingDateTime;
    private String amenityId;
}

