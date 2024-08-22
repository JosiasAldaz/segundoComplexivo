package com.app.controller;


import com.app.Errores.ResourceNotFoundException;
import com.app.entity.DtoHabitaciones;
import com.app.entity.EstudianteMateria;
import com.app.entity.Estudiantes;
import com.app.repository.EstudianteMateriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api")
@RequiredArgsConstructor
public class ResultanteControlador {

    private final EstudianteMateriaRepository repository;

    @GetMapping("/materiasdelestudiante")
    public List<EstudianteMateria> getMateriasDeStudiante(){
        return repository.findAll();
    }

    @PostMapping("/materiasdelestudiante")
    public EstudianteMateria createHabitacion(@RequestBody EstudianteMateria habitacion){
        return repository.save(habitacion);
    }

    @PutMapping("/materiasdelestudiante/{id}")
    public EstudianteMateria updatePosicion(@PathVariable Long id, @RequestBody EstudianteMateria estudiante) {
        EstudianteMateria modificacion = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Zona not found with id: " + id));
        return repository.save(modificacion);
    }

    @DeleteMapping("/materiasdelestudiante/{id}")
    public void deleteHabitacion(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
