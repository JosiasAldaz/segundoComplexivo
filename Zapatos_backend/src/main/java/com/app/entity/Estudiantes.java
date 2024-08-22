package com.app.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "estudiantes", uniqueConstraints = {@UniqueConstraint(columnNames = {"cedula"})})
public class Estudiantes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_estudiante;

    @Column(name = "cedula")
    private String cedula;
    private String nombre;
    private String apellido;
    private String categoria;
    private String direccion;
    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha_matricula;

    @OneToMany(targetEntity = EstudianteMateria.class, mappedBy = "estudiante")
    private Set<EstudianteMateria> materias = new HashSet<>();

}

