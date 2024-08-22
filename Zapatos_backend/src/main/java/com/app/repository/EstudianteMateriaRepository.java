package com.app.repository;

import com.app.entity.EstudianteMateria;
import com.app.entity.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudianteMateriaRepository extends JpaRepository<EstudianteMateria, Long> {

    List<EstudianteMateria> findByEstudianteCedula(String cedula);
}
