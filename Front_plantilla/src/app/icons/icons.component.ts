import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { estudianteService } from '../services/estudiante.service';
import { Estudiante } from '../model/Estudiante';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  tiposHabitacion: any[] = [];
  estudiante: Estudiante = new Estudiante();

  cedula: string = '';
  //ES EL NOMBRE PARA LA MATERIA
  horario: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';

  constructor(
    private router: Router,
    private estudianteservicio: estudianteService
  ) {}

  ngOnInit(): void {
   
  }

  Registrar() {
    // Convertir todos los campos a cadena y limpiar espacios
    const cedula = this.cedula.trim();
    const nombre = this.nombre.trim();
    const apellido = this.apellido.trim();
    const categoria = this.horario.trim();
    const direccion = this.direccion.trim();
    const fecha_matricula = new Date();
    // Convertir `this.precio` a cadenaco
    console.log('Cedula: ', cedula);
    console.log('Nombre: ', nombre);
    console.log('Apellido: ', apellido);
    console.log('Categoria: ', categoria);
    console.log('Direccion: ', direccion);
    
  
    // Validar campos
    if (cedula === '' || nombre === '' || apellido === '' || categoria === '' || direccion === '' ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los campos están vacíos, por favor completa todos los campos.',
      });
      return;
    }
        this.estudiante.cedula = cedula;
        this.estudiante.nombre = nombre;
        this.estudiante.apellido = apellido;
        this.estudiante.categoria = categoria;
        this.estudiante.direccion = direccion;
        this.estudiante.fecha_matricula = fecha_matricula;
        this.estudianteservicio.crear(this.estudiante).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'El estudiante ha sido registrada correctamente.',
            });
            this.router.navigate(['/ruta-al-listado']);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'La cedual ya se encuentra registrada.',
            });
            console.error('Error al guardar la habitación', error);
          }
        );
  }
  
  
  
  
}