package com.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "materia")
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_materia;

    private String materia;

    //@JsonManagedReference
    @OneToMany(targetEntity = EstudianteMateria.class, mappedBy = "materia")
    private Set<EstudianteMateria> students = new HashSet<>();

}
