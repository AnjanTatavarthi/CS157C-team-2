package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Dao.AmenityBookingRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.object.AmenityBooking;
import com.example.hotelamenitymanagementsystem.utils.AmenityBookingUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
@CrossOrigin(
        methods = {POST, GET, OPTIONS, PUT, DELETE, PATCH},
        maxAge = 3600,
        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"},
        origins = "*"
)
@RequestMapping("/api/v1/amenityBookings/")
public class AmenityBookingRestController {

    private AmenityBookingRepositoryCassandra repo;

    public AmenityBookingRestController(AmenityBookingRepositoryCassandra amenityBookingRepositoryCassandra) {
        this.repo = amenityBookingRepositoryCassandra;
    }

    @GetMapping
    public Stream<AmenityBooking> findAll(HttpServletRequest req) {
        return repo.findAll().stream()
                .map(AmenityBookingUtils::mapAsAmenityBooking);
    }

    @GetMapping("/{amenity_booking_id}")
    public ResponseEntity<AmenityBooking> findById(HttpServletRequest req,
                                                   @PathVariable(value = "amenity_booking_id") String amenity_booking_id) {
        Optional<AmenityBookingEntity> e = repo.findById(UUID.fromString(amenity_booking_id));
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AmenityBookingUtils.mapAsAmenityBooking(e.get()));
    }

    @PostMapping
    public ResponseEntity<AmenityBooking> create(HttpServletRequest req, @RequestBody AmenityBooking amenityBooking)
            throws URISyntaxException {
        AmenityBookingEntity amenityBookingEntity = AmenityBookingUtils.mapAsAmenityBookingEntity(amenityBooking);
        repo.save(amenityBookingEntity);
        AmenityBooking amenityBookingSaved = AmenityBookingUtils.mapAsAmenityBooking(amenityBookingEntity);
        return ResponseEntity.ok(amenityBookingSaved);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(HttpServletRequest request) {
        repo.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}