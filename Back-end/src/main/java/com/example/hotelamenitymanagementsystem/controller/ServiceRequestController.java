package com.example.hotelamenitymanagementsystem.controller;

import static com.example.hotelamenitymanagementsystem.utils.AmenityUtils.mapAsAmenityEntity;
import static com.example.hotelamenitymanagementsystem.utils.ServiceRequestUtils.mapAsServiceRequestEntity;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import com.example.hotelamenitymanagementsystem.Dao.AmenityRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Dao.ServiceRequestRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.Entity.AmenityEntity;
import com.example.hotelamenitymanagementsystem.Entity.ServiceRequestEntity;
import com.example.hotelamenitymanagementsystem.object.Amenity;
import com.example.hotelamenitymanagementsystem.object.ServiceRequest;
import com.example.hotelamenitymanagementsystem.utils.AmenityUtils;
import com.example.hotelamenitymanagementsystem.utils.ServiceRequestUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(
        methods = {POST, GET, OPTIONS, PUT, DELETE, PATCH},
        maxAge = 3600,
        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"},
        origins = "*"
)

@RequestMapping("/api/v1/servicerequests")
public class ServiceRequestController {

    private ServiceRequestRepositoryCassandra repo;

    public ServiceRequestController(ServiceRequestRepositoryCassandra serviceRequestRepo) {
        this.repo = serviceRequestRepo;
    }

    @GetMapping
    public Stream<ServiceRequest> findAll(HttpServletRequest req) {
        return repo.findAll().stream()
                .map(ServiceRequestUtils::mapAsServiceRequest);
    }

    @GetMapping("/{service_request_id}")
    public ResponseEntity<ServiceRequest> findById(HttpServletRequest req, @PathVariable(value = "service_request_id") String serviceRequestId) {
        Optional<ServiceRequestEntity> e = repo.findById(UUID.fromString(serviceRequestId));
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ServiceRequestUtils.mapAsServiceRequest(e.get()));
    }


    @GetMapping("/guest-email/{guest_email}")
    public Stream<ServiceRequest> findByGuestEmail(HttpServletRequest req, @PathVariable(value = "guest_email") String guestEmail) {
        return repo.findAll().stream()
                .map(ServiceRequestUtils::mapAsServiceRequest)
                .filter(serviceRequest -> serviceRequest.getGuestEmail().equals(guestEmail));
    }


    @GetMapping("/assigned-staff/{assigned_staff}")
    public Stream<ServiceRequest> findByAssignedStaff(HttpServletRequest req, @PathVariable(value = "assigned_staff") String assignedStaff) {
        return repo.findAll().stream()
                .map(ServiceRequestUtils::mapAsServiceRequest)
                .filter(serviceRequest -> serviceRequest.getAssignedStaff() != null && serviceRequest.getAssignedStaff().equals(assignedStaff));
    }





    @PostMapping
    public ResponseEntity<ServiceRequest> create(HttpServletRequest req, @RequestBody ServiceRequest serviceRequest)
            throws URISyntaxException {
        serviceRequest.setStatus("open");
        serviceRequest.setAssignedStaff(null);
        ServiceRequestEntity serviceRequestEntity = mapAsServiceRequestEntity(serviceRequest);
        repo.save(serviceRequestEntity);
        return ResponseEntity.ok(ServiceRequestUtils.mapAsServiceRequest(serviceRequestEntity));
    }


    @PatchMapping("/{service_request_id}")
    public ResponseEntity<ServiceRequest> update(
            HttpServletRequest req,
            @PathVariable(value = "service_request_id") String serviceRequestId,
            @RequestBody ServiceRequest updatedServiceRequest
    ) {
        Optional<ServiceRequestEntity> e = repo.findById(UUID.fromString(serviceRequestId));
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ServiceRequestEntity existingServiceRequest = e.get();
        if (updatedServiceRequest.getGuestEmail() != null) {
            existingServiceRequest.setGuestEmail(updatedServiceRequest.getGuestEmail());
        }
        if (updatedServiceRequest.getComments() != null) {
            existingServiceRequest.setComments(updatedServiceRequest.getComments());
        }
        if (updatedServiceRequest.getStatus() != null) {
            existingServiceRequest.setStatus(updatedServiceRequest.getStatus());
        }
        if (updatedServiceRequest.getAssignedStaff() != null) {
            existingServiceRequest.setAssignedStaff(updatedServiceRequest.getAssignedStaff());
        }
        ServiceRequestEntity updatedServiceRequestEntity = repo.save(existingServiceRequest);
        return ResponseEntity.ok(ServiceRequestUtils.mapAsServiceRequest(updatedServiceRequestEntity));
    }








    @DeleteMapping("/{service_request_id}")
    public ResponseEntity<ServiceRequest> delete(
            @PathVariable("service_request_id") String serviceRequestId
    ) {
        Optional<ServiceRequestEntity> optionalServiceRequestEntity = repo.findById(UUID.fromString(serviceRequestId));
        if (optionalServiceRequestEntity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(UUID.fromString(serviceRequestId));
        return ResponseEntity.noContent().build();
    }

}
