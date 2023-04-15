package com.example.hotelamenitymanagementsystem.controller;

import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.User;

public class UserUtils {

    public static UserEntity mapAsUserEntity(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setMiddleName(user.getMiddleName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(user.getPassword());
        userEntity.setDateOfBirth(user.getDateOfBirth());
        return userEntity;
    }

    public static User mapAsUser(UserEntity userEntity) {
        User user = new User();
        user.setFirstName(userEntity.getFirstName());
        user.setMiddleName(userEntity.getMiddleName());
        user.setLastName(userEntity.getLastName());
        user.setPassword(userEntity.getPassword());
        user.setEmail(userEntity.getEmail());
        user.setDateOfBirth(userEntity.getDateOfBirth());
        return user;
    }


}
