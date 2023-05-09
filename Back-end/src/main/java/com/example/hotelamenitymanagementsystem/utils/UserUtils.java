package com.example.hotelamenitymanagementsystem.utils;

import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.User;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class UserUtils {

    public static UserEntity mapAsUserEntity(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setDateOfBirth(user.getDateOfBirth());
        userEntity.setRole(user.getRole());
        return userEntity;
    }

    public static User mapAsUser(UserEntity userEntity) {
        User user = new User();
        user.setFirstName(userEntity.getFirstName());
        user.setLastName(userEntity.getLastName());
        user.setPassword(userEntity.getPassword());
        user.setEmail(userEntity.getEmail());
        user.setDateOfBirth(userEntity.getDateOfBirth());
        user.setRole(userEntity.getRole());
        return user;
    }

    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashedBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
            }

            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

}
