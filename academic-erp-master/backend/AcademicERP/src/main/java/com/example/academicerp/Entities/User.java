package com.example.academicerp.Entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer id;

    @NonNull
    @Column(name="password")
    private String password;

    @NonNull
    @Column(name="active")
    private Boolean active;

    @NonNull
    @Column(name="expired")
    private Boolean expired;

    @OneToOne
    @JoinColumn(name="employee_id", nullable = true)
    private Employee employee;




}
