package com.example.hotelamenitymanagementsystem.controller;

import static com.example.hotelamenitymanagementsystem.controller.AmenityUtils.mapAsAmenityEntity;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URISyntaxException;
import java.util.Optional;
import java.util.stream.Stream;
//import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import com.example.hotelamenitymanagementsystem.Dao.AmenityRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.AmenityEntity;
import com.example.hotelamenitymanagementsystem.object.Amenity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(
        methods = {POST, GET, OPTIONS, PUT, DELETE, PATCH},
        maxAge = 3600,
        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"},
        origins = "*"
)
@RequestMapping("/api/v1/amenities/")
public class AmenityRestController {

    private AmenityRepositoryCassandra repo;

    public AmenityRestController(AmenityRepositoryCassandra amenityRepo) {
        this.repo = amenityRepo;
    }

    @GetMapping
    public Stream<Amenity> findAll(HttpServletRequest req) {
        return repo.findAll().stream()
                .map(AmenityUtils::mapAsAmenity);
    }

    @GetMapping("/{amenity_id}")
    public ResponseEntity<Amenity> findById(HttpServletRequest req, @PathVariable(value = "amenity_id") String amenity_id) {
        Optional<AmenityEntity> e = repo.findById(amenity_id);
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(AmenityUtils.mapAsAmenity(e.get()));
    }

    @PostMapping
    public ResponseEntity<Amenity> create(HttpServletRequest req, @RequestBody Amenity amenity)
            throws URISyntaxException {
        AmenityEntity amenityEntity = mapAsAmenityEntity(amenity);
        repo.save(amenityEntity);
        return ResponseEntity.ok(amenity);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(HttpServletRequest request) {
        repo.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
