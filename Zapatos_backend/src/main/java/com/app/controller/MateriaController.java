package com.app.controller;

import com.app.Errores.ResourceNotFoundException;
import com.app.entity.DtoMateria;
import com.app.entity.Materia;
import com.app.repository.MateriaRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api")
@RequiredArgsConstructor
public class MateriaController {

    private final ModelMapper modelMapper;

    private final MateriaRepository materiaRepository;

    private DtoMateria entityToDto(Materia entity) {
        return modelMapper.map(entity, DtoMateria.class);
    }

    @GetMapping("/materia")
    public List<?> getTipos() {
        return materiaRepository.findAll().stream().map(this::entityToDto).collect(Collectors.toList());
    }

    @GetMapping("/materia/{id}")
    public ResponseEntity<DtoMateria> buscarTipo(@PathVariable Long id) {
        return materiaRepository.findById(id)
                .map(this::entityToDto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/materia")
    public Materia createHabitacion(@RequestBody Materia habitacion){
        return materiaRepository.save(habitacion);
    }

    @PutMapping("/materia/{id}")
    public Materia updatePosicion(@PathVariable Long id, @RequestBody Materia tipo) {
        Materia modificacion = materiaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Zona not found with id: " + id));
        modificacion.setMateria(tipo.getMateria());
        return materiaRepository.save(modificacion);
    }

    @DeleteMapping("/materia/{id}")
    public void deleteHabitacion(@PathVariable Long id) {
        materiaRepository.deleteById(id);
    }



}
