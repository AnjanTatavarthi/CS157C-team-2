package com.example.hotelamenitymanagementsystem.controller;


import static com.example.hotelamenitymanagementsystem.utils.UserUtils.mapAsUserEntity;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.OPTIONS;
import static org.springframework.web.bind.annotation.RequestMethod.PATCH;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import com.example.hotelamenitymanagementsystem.Dao.UserRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.User;
import com.example.hotelamenitymanagementsystem.utils.UserUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.stream.Collectors;


@RestController
@CrossOrigin(
        methods = {POST, GET, OPTIONS, PUT, DELETE, PATCH},
        maxAge = 3600,
        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"},
        origins = "*"
)
@RequestMapping("/api/v1/users/")
public class UserRestController {

    private UserRepositoryCassandra repo;

    public UserRestController(UserRepositoryCassandra userRepo) {
        this.repo = userRepo;
    }

    @GetMapping
    public Stream<User> findAll(HttpServletRequest req) {
        return repo.findAll().stream()
                .map(UserUtils::mapAsUser);
    }

    @GetMapping("/{user_name}")
    public ResponseEntity<User> findById(HttpServletRequest req, @PathVariable(value = "user_name") String user_name) {
        Optional<UserEntity> e = repo.findById(user_name);
        if (e.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(UserUtils.mapAsUser(e.get()));
    }


    @GetMapping("/staff")
    public Stream<User> findAllStaff(HttpServletRequest req) {
        return repo.findAll().stream()
            .map(userEntity -> {
                String firstName = userEntity.getFirstName() != null ? userEntity.getFirstName() : "Unknown";
                String lastName = userEntity.getLastName() != null ? userEntity.getLastName() : "Unknown";
                String email = userEntity.getEmail() != null ? userEntity.getEmail() : "Unknown";
                String password = userEntity.getPassword() != null ? userEntity.getPassword() : "Unknown";
                LocalDate dateOfBirth = userEntity.getDateOfBirth() != null ? userEntity.getDateOfBirth() : null;
                String role = userEntity.getRole() != null ? userEntity.getRole() : "Unknown";
                return new User(firstName, lastName, dateOfBirth, password, email,  role);
            })
                .filter(userEntity -> userEntity.getRole().equals("staff"));
    }



    @GetMapping("/guest")
    public Stream<User> findAllGuest(HttpServletRequest req) {
        return repo.findAll().stream()
                .map(userEntity -> {
                    String firstName = userEntity.getFirstName() != null ? userEntity.getFirstName() : "Unknown";
                    String lastName = userEntity.getLastName() != null ? userEntity.getLastName() : "Unknown";
                    String email = userEntity.getEmail() != null ? userEntity.getEmail() : "Unknown";
                    String password = userEntity.getPassword() != null ? userEntity.getPassword() : "Unknown";
                    LocalDate dateOfBirth = userEntity.getDateOfBirth() != null ? userEntity.getDateOfBirth() : null;
                    String role = userEntity.getRole() != null ? userEntity.getRole() : "Unknown";
                    return new User(firstName, lastName, dateOfBirth, password, email,  role);
                })
                .filter(userEntity -> userEntity.getRole().equals("guest"));
    }


    @GetMapping("/admin")
    public Stream<User> findAllAdmin(HttpServletRequest req) {
        return repo.findAll().stream()
                .map(userEntity -> {
                    String firstName = userEntity.getFirstName() != null ? userEntity.getFirstName() : "Unknown";
                    String lastName = userEntity.getLastName() != null ? userEntity.getLastName() : "Unknown";
                    String email = userEntity.getEmail() != null ? userEntity.getEmail() : "Unknown";
                    String password = userEntity.getPassword() != null ? userEntity.getPassword() : "Unknown";
                    LocalDate dateOfBirth = userEntity.getDateOfBirth() != null ? userEntity.getDateOfBirth() : null;
                    String role = userEntity.getRole() != null ? userEntity.getRole() : "Unknown";
                    return new User(firstName, lastName, dateOfBirth, password, email,  role);
                })
                .filter(userEntity -> userEntity.getRole().equals("admin"));
    }


    @PostMapping
    public ResponseEntity<User> create(HttpServletRequest req, @RequestBody User user)
            throws URISyntaxException {
        UserEntity userEntity = mapAsUserEntity(user);
        repo.save(userEntity);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{user_email}")
    public ResponseEntity<User> update(HttpServletRequest req, @PathVariable(value = "user_email") String user_name, @RequestBody User updatedUser) {
        Optional<UserEntity> existingEntity = repo.findById(user_name);
        if (existingEntity.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserEntity existingUserEntity = existingEntity.get();
        UserEntity updatedUserEntity = UserUtils.mapAsUserEntity(updatedUser);
        updatedUserEntity.setEmail(existingUserEntity.getEmail()); // Make sure the ID stays the same
        repo.save(updatedUserEntity);
        return ResponseEntity.ok(UserUtils.mapAsUser(updatedUserEntity));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(HttpServletRequest request) {
        repo.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}