package com.example.hotelamenitymanagementsystem.object;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {
    private String requestId;
    private String amenityId;
    private String guestEmail;
    private String comments;
    private String status;
    private String assignedStaff;
}
