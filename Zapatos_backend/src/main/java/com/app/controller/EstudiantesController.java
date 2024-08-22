package com.app.controller;

import com.app.Errores.ResourceNotFoundException;
import com.app.entity.*;
import com.app.repository.EstudianteMateriaRepository;
import com.app.repository.EstudiantesRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class EstudiantesController {

    private final ModelMapper modelMapper;

    private final EstudiantesRepository estudiantesRepository;

    private final EstudianteMateriaRepository estudianteMateriaRepository;

    private DtoHabitaciones entityToDtoHabitaciones(Estudiantes estudiantes) {
        return modelMapper.map(estudiantes, DtoHabitaciones.class);
    }

    private DtoMateria entityToDtoMateria(Materia materia) {
        return modelMapper.map(materia, DtoMateria.class);
    }

    @GetMapping("/estudiantes")
    public List<DtoHabitaciones> habitaciones(){
         return estudiantesRepository.findAll().stream().map(this::entityToDtoHabitaciones).collect(Collectors.toList());
    }

    @GetMapping("/materias/{cedula}")
    public List<?> getMateriasPorEstudiante(@PathVariable String cedula) {
        List<EstudianteMateria> list = estudianteMateriaRepository.findByEstudianteCedula(cedula);
        List<Materia> listMat = list.stream().map(EstudianteMateria::getMateria).toList();
        return listMat.stream().map(this::entityToDtoMateria).toList();
    }

    @PostMapping("/estudiantes")
    public Estudiantes createHabitacion(@RequestBody Estudiantes habitacion){
        return estudiantesRepository.save(habitacion);
    }

    @PutMapping("/estudiantes/{id}")
    public Estudiantes updatePosicion(@PathVariable Long id, @RequestBody Estudiantes estudiante) {
        Estudiantes modificacion = estudiantesRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Zona not found with id: " + id));
        modificacion.setApellido(estudiante.getApellido());
        modificacion.setNombre(estudiante.getNombre());
        modificacion.setCategoria(estudiante.getCategoria());
        modificacion.setDireccion(estudiante.getDireccion());
        return estudiantesRepository.save(modificacion);
    }

    @DeleteMapping("/estudiantes/{id}")
    public void deleteHabitacion(@PathVariable Long id) {
        estudiantesRepository.deleteById(id);
    }
}
