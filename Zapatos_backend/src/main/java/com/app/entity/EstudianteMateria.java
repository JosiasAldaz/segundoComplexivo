package com.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class EstudianteMateria {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fecha_matricula;

    @ManyToOne(targetEntity = Estudiantes.class)
    private Estudiantes estudiante;

    @ManyToOne(targetEntity = Materia.class)
    private Materia materia;

}

