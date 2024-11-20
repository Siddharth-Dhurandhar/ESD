package com.project.esd_web.controllers;
import java.security.Principal;
import java.util.List;
import java.util.Map;

import com.project.esd_web.entities.User;
import com.project.esd_web.repositories.CustomerRepo;
import com.project.esd_web.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")

//http://localhost:8080/home/users
public class homeController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerRepo customerRepo;


    @GetMapping("/users")
    public List<User> getUsers() {
        System.out.println("Welcome to the home page");
        return userService.getUsers();
    }

    @DeleteMapping("/deleteUser")
    public void deleteUser(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        customerRepo.deleteById(userId);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/curuser")
    public String getLoggedInUser(Principal principal) {
        return principal.getName();
    }
}
