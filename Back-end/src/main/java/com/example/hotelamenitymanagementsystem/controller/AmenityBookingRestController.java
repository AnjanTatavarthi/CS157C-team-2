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
import java.time.format.DateTimeFormatter;
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
        return repo.findAll().stream()
                .map(AmenityBookingUtils::mapAsAmenityBooking);
    }

    @GetMapping("/canceled")
    public Stream<AmenityBooking> findCanceled(HttpServletRequest req) {
        return repo.getCanceledBookings().stream()
                .map(AmenityBookingUtils::mapAsAmenityBooking);

    }

    @GetMapping("/confirmed")
    public Stream<AmenityBooking> findOpen(HttpServletRequest req) {
        return repo.getConfirmedBooking().stream()
                .map(AmenityBookingUtils::mapAsAmenityBooking);
    }

    @GetMapping("/guest-email/{guest_email}")
    public Stream<AmenityBooking> findByGuestEmail(HttpServletRequest req, @PathVariable(value = "guest_email") String guestEmail) {
        return repoById.findByEmail(guestEmail)
                .stream().map(AmenityBookingUtils::mapAsAmenityBooking);
    }

    @GetMapping("/booking_info/{email}/{amenity_booking_id}")
    public ResponseEntity<AmenityBooking> findById(HttpServletRequest req,
                                                   @PathVariable(value = "email") String email,
                                                   @PathVariable(value = "amenity_booking_id") UUID amenity_booking_id) {
        List<AmenityBookingEntityById> e = repoById.findByEmail(email);
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AmenityBookingUtils.mapAsAmenityBooking(e.stream().findFirst().get()));
    }

    @GetMapping("/{amenity_id}/{booking_date}")
    public ResponseEntity<Stream<String>> getFilledTimeSlots(HttpServletRequest req,
                                                             @PathVariable(value = "amenity_id") String amenity_id,
                                                             @PathVariable("booking_date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        List<AmenityBookingEntity> amenityBookings = repo.findByAmenityIdAndBookingDate(amenity_id, date);
        Stream<String> formattedTimeSlots = amenityBookings.stream()
                .flatMap(booking -> booking.getBookingTime()
                        .stream()
                        .map(time -> time.format(DateTimeFormatter.ofPattern("HH:mm"))));
        return ResponseEntity.ok(formattedTimeSlots);
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

    @DeleteMapping("/{user_email}/{booking_id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable String user_email, @PathVariable UUID booking_id) {
        AmenityBookingEntityById amenityBookingEntityById = repoById.findByEmail(user_email).stream().filter(booking -> booking.getBookingId().equals(booking_id)).findFirst().get();
        AmenityBookingEntity amenityBookingEntity = AmenityBookingUtils.convertToBookingEntity(amenityBookingEntityById);
        amenityBookingEntity.setCanceled(Boolean.TRUE);
        amenityBookingEntityById.setCanceled(Boolean.TRUE);
        repo.save(amenityBookingEntity);
        repoById.save(amenityBookingEntityById);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}