package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Dao.UserRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.User;
import com.example.hotelamenitymanagementsystem.utils.UserUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;
import java.util.stream.Stream;

import static com.example.hotelamenitymanagementsystem.utils.UserUtils.hashPassword;
import static com.example.hotelamenitymanagementsystem.utils.UserUtils.mapAsUserEntity;
import static org.springframework.web.bind.annotation.RequestMethod.*;

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

    @PostMapping
    public ResponseEntity<User> create(HttpServletRequest req, @RequestBody User user)
            throws URISyntaxException {
        UserEntity userEntity = mapAsUserEntity(user);
        userEntity.setPassword(hashPassword(user.getPassword()));
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
        updatedUserEntity.setPassword(hashPassword(updatedUser.getPassword())); // Hash the updated password
        repo.save(updatedUserEntity);
        return ResponseEntity.ok(UserUtils.mapAsUser(updatedUserEntity));
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll(HttpServletRequest request) {
        repo.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}