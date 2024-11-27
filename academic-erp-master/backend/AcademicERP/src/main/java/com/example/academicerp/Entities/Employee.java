package com.example.academicerp.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity(name="employee")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Employee implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="employee_id")
    private Integer id;

    @Column(name="first_name", nullable = false)
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(unique = true, name = "email", nullable = false)
    private String email;

    @Column(name="title")
    private String title;

    @Column(name="photograph_path")
    private String path;

    @ManyToOne
    @JoinColumn(name="department_id", nullable = true)
    private Department department;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return email;
    }

}
