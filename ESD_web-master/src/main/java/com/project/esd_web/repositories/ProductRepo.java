package com.project.esd_web.repositories;

import com.project.esd_web.entities.Product;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product, String> {
    public Optional<Product> findById(String s);

    @Query("SELECT p FROM Product p WHERE p.productPrice BETWEEN 15 AND 30 ORDER BY p.productPrice DESC")
    public List<Product> findProductByPrice();
}