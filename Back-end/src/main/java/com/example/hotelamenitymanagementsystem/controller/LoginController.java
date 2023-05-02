package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Dao.UserRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.LoginRequest;
import com.example.hotelamenitymanagementsystem.object.LoginResponse;
import com.example.hotelamenitymanagementsystem.object.User;
import com.example.hotelamenitymanagementsystem.utils.UserUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.util.Objects;
import java.util.Optional;


import static org.springframework.web.bind.annotation.RequestMethod.*;


@RestController
@CrossOrigin(
        methods = {POST},
        maxAge = 3600,
        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"},
        origins = "*"
)
@RequestMapping("api/v1/login")
public class LoginController {

    private UserRepositoryCassandra repo;

    public LoginController(UserRepositoryCassandra userRepo) {
        this.repo = userRepo;
    }

    @PostMapping
    public ResponseEntity<LoginResponse> login(HttpServletRequest req, @RequestBody LoginRequest loginRequest)
            throws URISyntaxException {

        Optional<UserEntity> user = repo.findById(loginRequest.getEmail());

        LoginResponse loginResponse = LoginResponse.builder()
                .success(false)
                .build();

        if (user.isPresent() && Objects.equals(user.get().getPassword(), loginRequest.getPassword())) {
            UserEntity userEntity = user.get();
            loginResponse = LoginResponse.builder()
                    .firstName(userEntity.getFirstName())
                    .lastName(userEntity.getLastName())
                    .email(userEntity.getEmail())
                    .dateOfBirth(userEntity.getDateOfBirth())
                    .role(userEntity.getRole())
                    .success(true)
                    .build();
        }

        return ResponseEntity.ok(loginResponse);
    }
}



