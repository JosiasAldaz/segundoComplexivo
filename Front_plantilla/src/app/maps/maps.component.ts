import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Materia } from '../model/Materia';
import { materiaService } from '../services/materia.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {
  tipo: string = '';

  constructor(private materiaService:materiaService) {}

  Registrar(form: any): void {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Los campos están vacíos, por favor completa todos los campos.',
      });
      return;
    }
    const nuevoTipo: Materia = {
      materia: this.tipo,
      
    };
    this.materiaService.crear(nuevoTipo).subscribe(
      response => {
        Swal.fire({
            icon: 'success',
            title: 'Creación correcta',
            text: 'tipo '+this.tipo+' correctamente',
        });
        form.reset(); 
      },
      error => {
        console.error('Error al registrar tipo', error);
      }
    );
  }
}
