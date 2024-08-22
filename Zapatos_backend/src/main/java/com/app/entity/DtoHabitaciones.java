package com.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoHabitaciones implements Serializable {


    private Long id_estudiante;

    private String cedula;
    private String nombre;
    private String apellido;
    private String categoria;
    private String direccion;
    private Date fecha_matricula;

    @JsonIgnoreProperties("estudiantes")
    private Materia materia;
}
