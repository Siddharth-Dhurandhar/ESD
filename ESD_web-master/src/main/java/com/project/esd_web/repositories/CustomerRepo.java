package com.project.esd_web.repositories;

import com.project.esd_web.entities.Product;
import com.project.esd_web.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepo extends JpaRepository<User, String> {
    public Optional<User> findByEmail(String email);
}


