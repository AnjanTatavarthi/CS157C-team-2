package com.example.hotelamenitymanagementsystem.utils;

import com.example.hotelamenitymanagementsystem.Entity.UserEntity;
import com.example.hotelamenitymanagementsystem.object.User;

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


}
