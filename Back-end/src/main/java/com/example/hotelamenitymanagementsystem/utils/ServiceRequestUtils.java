package com.example.hotelamenitymanagementsystem.utils;

import com.example.hotelamenitymanagementsystem.Entity.ServiceRequestEntity;
import com.example.hotelamenitymanagementsystem.object.ServiceRequest;

import java.util.UUID;

public class ServiceRequestUtils {

    public static ServiceRequestEntity mapAsServiceRequestEntity(ServiceRequest serviceRequest) {
        ServiceRequestEntity serviceRequestEntity = new ServiceRequestEntity();
        serviceRequestEntity.setRequestId(UUID.randomUUID());
        serviceRequestEntity.setAmenityId(serviceRequest.getAmenityId());
        serviceRequestEntity.setGuestEmail(serviceRequest.getGuestEmail());
        serviceRequestEntity.setComments(serviceRequest.getComments());
        serviceRequestEntity.setStatus(serviceRequest.getStatus());
        serviceRequestEntity.setAssignedStaff(serviceRequest.getAssignedStaff());
        return serviceRequestEntity;
    }

    public static ServiceRequest mapAsServiceRequest(ServiceRequestEntity serviceRequestEntity) {
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setRequestId(serviceRequestEntity.getRequestId().toString());
        serviceRequest.setAmenityId(serviceRequestEntity.getAmenityId());
        serviceRequest.setGuestEmail(serviceRequestEntity.getGuestEmail());
        serviceRequest.setComments(serviceRequestEntity.getComments());
        serviceRequest.setStatus(serviceRequestEntity.getStatus());
        serviceRequest.setAssignedStaff(serviceRequestEntity.getAssignedStaff());
        return serviceRequest;
    }

}
