package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Dao.UserRepositoryCassandra;
import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.RegistrationResponse;
import com.example.hotelamenitymanagementsystem.object.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URISyntaxException;
import java.util.Optional;

import static com.example.hotelamenitymanagementsystem.utils.UserUtils.mapAsUserEntity;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


@RestController
@CrossOrigin(
        methods = {POST},
        maxAge = 3600,
        allowedHeaders = {"x-requested-with", "origin", "content-type", "accept"},
        origins = "*"
)
@RequestMapping("api/v1/register")
public class RegistrationController {

    private UserRepositoryCassandra repo;

    public RegistrationController(UserRepositoryCassandra userRepo) {
        this.repo = userRepo;
    }

    @PostMapping
    public ResponseEntity<RegistrationResponse> login(HttpServletRequest req, @RequestBody User user)
            throws URISyntaxException {

        Optional<UserEntity> userEntity = repo.findById(user.getEmail());

        if (userEntity.isPresent()) {
            RegistrationResponse registrationResponse = RegistrationResponse.builder()
                    .success(false)
                    .errorMessage("Account Exists")
                    .build();
            return ResponseEntity.ok(registrationResponse);
        } else {
            UserEntity newUserEntity = mapAsUserEntity(user);
            repo.save(newUserEntity);
            RegistrationResponse registrationResponse = RegistrationResponse.builder()
                    .success(true)
                    .build();
            return ResponseEntity.ok(registrationResponse);
        }
    }
}
