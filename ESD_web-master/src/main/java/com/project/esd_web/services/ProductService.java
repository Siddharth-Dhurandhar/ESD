package com.project.esd_web.services;

import java.util.ArrayList;
import java.util.List;

import com.project.esd_web.entities.Product;
import com.project.esd_web.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> getProducts() {
        List<Product> pro = new ArrayList<>();
        productRepo.findAll().forEach(p -> pro.add(p));
        return pro;
    }
}