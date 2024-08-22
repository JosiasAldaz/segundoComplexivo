package com.app.repository;

import com.app.entity.Estudiantes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudiantesRepository extends JpaRepository<Estudiantes, Long> {

}
