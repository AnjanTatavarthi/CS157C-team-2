package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Dao.AmenityBookingByIdRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Dao.AmenityBookingRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntity;
import com.example.hotelamenitymanagementsystem.Entity.AmenityBookingEntityById;
import com.example.hotelamenitymanagementsystem.object.AmenityBooking;
import com.example.hotelamenitymanagementsystem.utils.AmenityBookingUtils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
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
@RequestMapping("/api/v1/amenityBookings")
public class AmenityBookingRestController {

    private AmenityBookingRepositoryCassandra repo;
    private AmenityBookingByIdRepositoryCassandra repoById;

    public AmenityBookingRestController(AmenityBookingRepositoryCassandra amenityBookingRepositoryCassandra,
                                        AmenityBookingByIdRepositoryCassandra amenityBookingByIdRepositoryCassandra) {
        this.repo = amenityBookingRepositoryCassandra;
        this.repoById = amenityBookingByIdRepositoryCassandra;
    }

    @GetMapping
    public Stream<AmenityBooking> findAll(HttpServletRequest req) {
        return repoById.findAll().stream()
                .map(AmenityBookingUtils::mapAsAmenityBooking);
    }

    @GetMapping("/{amenity_booking_id}")
    public ResponseEntity<AmenityBooking> findById(HttpServletRequest req,
                                                   @PathVariable(value = "amenity_booking_id") UUID amenity_booking_id) {
        Optional<AmenityBookingEntityById> e = repoById.findById(amenity_booking_id);
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AmenityBookingUtils.mapAsAmenityBooking(e.get()));
    }

    @GetMapping("/{amenity_booking_id}/{booking_date}")
    public Stream<AmenityBooking> findByIdAndDate(HttpServletRequest req,
                                                  @PathVariable(value = "amenity_booking_id") String amenity_booking_id,
                                                  @PathVariable("booking_date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        List<AmenityBookingEntity> amenityBookings = repo.findByAmenityIdAndBookingDate(amenity_booking_id, date);
        return amenityBookings.stream().map(AmenityBookingUtils::mapAsAmenityBooking);
    }

    @PostMapping
    public ResponseEntity<AmenityBooking> create(HttpServletRequest req, @RequestBody AmenityBooking amenityBooking)
            throws URISyntaxException {


        AmenityBookingEntityById amenityBookingEntity = AmenityBookingUtils.mapAsAmenityBookingEntityId(amenityBooking);
        amenityBooking.setBookingId(amenityBookingEntity.getBookingId().toString());
        AmenityBookingEntity amenityBookingEntity1 = AmenityBookingUtils.mapAsAmenityBookingEntity(amenityBooking);

        repoById.save(amenityBookingEntity);
        repo.save(amenityBookingEntity1);

        AmenityBooking amenityBookingSaved = AmenityBookingUtils.mapAsAmenityBooking(amenityBookingEntity);
        return ResponseEntity.ok(amenityBookingSaved);
    }

    @DeleteMapping("/{amenityId}")
    public ResponseEntity<Void> deleteAmenity(@PathVariable UUID amenityId) {
        repo.deleteById(amenityId);
        repoById.deleteById(amenityId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(HttpServletRequest request) {
        repo.deleteAll();
        repoById.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}