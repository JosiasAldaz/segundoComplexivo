package com.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoMateria implements Serializable {

    private Long id_materia;

    private String materia;

    @JsonIgnoreProperties("materia")
    private List<Estudiantes> estudiantes;
}
