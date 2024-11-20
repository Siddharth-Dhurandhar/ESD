package com.project.esd_web.controllers;

import com.project.esd_web.entities.Product;
import com.project.esd_web.repositories.ProductRepo;
import com.project.esd_web.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product")

public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepo productRepo;

    @GetMapping("/getpro")
    public List<Product> getProducts() {
        List<Product> products = productRepo.findProductByPrice();
        return products.stream().limit(2).toList();
    }
}
