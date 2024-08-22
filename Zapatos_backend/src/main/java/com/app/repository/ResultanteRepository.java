package com.app.repository;

import com.app.entity.EstudianteMateria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultanteRepository extends JpaRepository<EstudianteMateria,Long> {
}
