package com.project.esd_web.services;

import com.project.esd_web.entities.User;
import com.project.esd_web.repositories.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private List<User> store = new ArrayList<>();

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public List<User> getUsers() {
        return customerRepo.findAll();
    }

    public void deleteUser(String userId){
        customerRepo.deleteById(userId);
    }

    public User createUser(User user){
        user.setUserId(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return customerRepo.save(user);
    }

    public User updateUser(User user){
        return customerRepo.save(user);
    }
}