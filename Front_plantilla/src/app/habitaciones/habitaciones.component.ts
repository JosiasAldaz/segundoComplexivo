import { Component, OnInit } from '@angular/core';// Asegúrate de importar el modelo
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { estudianteService } from '../services/estudiante.service';
import { Estudiante } from '../model/Estudiante';


@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent implements OnInit {
  
  

  tiposHabitacion: any[] = [];
  searchTerm: string = '';
  habitaciones: Estudiante[] = [];
  isModalOpen = false;
  registroSeleccionado: any = {};
  filteredHabitaciones: any[] = [];
  constructor(private estudianteServ:estudianteService) { }

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  createPdf() {
    const pdfDefinition: any = {
      content: [
        { text: 'Listado de Estudiantes', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              // Encabezados de la tabla
              ['Cédula', 'Nombre', 'Apellido', 'Fecha de Matrícula'],
              // Filas de la tabla basadas en los estudiantes filtrados
              ...this.filteredHabitaciones.map(habitacion => ([
                habitacion.cedula,
                habitacion.nombre,
                habitacion.apellido,
                habitacion.fecha_matricula
              ]))
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };
  
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download('reporte_estudiantes.pdf');
  }

  closeModal() {
    this.isModalOpen = false; // Cierra la ventana modal
  }

  cargarHabitaciones(): void {
    this.estudianteServ.getAlertas().subscribe(
      (data: Estudiante[]) => {
        console.log('Datos cargados:', data);
        this.habitaciones = data;
        this.filteredHabitaciones = data.map(estudiante => ({
          ...estudiante,
          fecha_matricula: formatDate(estudiante.fecha_matricula, 'dd/MM/yyyy', 'en')
        }));
      },
      (error) => {
        console.error('Error al cargar las habitaciones', error);
      }
    );
  }
  
  

  editar(habitacion: any) {
    this.registroSeleccionado = { ...habitacion }; 
    this.isModalOpen = true;    
  }

  ver(id: number): void {
    // Lógica para ver los detalles de una habitación
    console.log('Ver habitación con ID:', id);
  }

  eliminar(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, ¡no podrás recuperar este ESTUDIANTE!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('El ID seleccionado es: ', id);
        this.estudianteServ.eliminar(id).subscribe(
          (data: Estudiante) => {
                Swal.fire(
                  'Success',
                  'Se eliminó la habitación correctamente',
                  'success'
                );
            this.cargarHabitaciones();
          },
          (error) => {
            Swal.fire(
              'Error',
              'NO SE PUEDE ELIMINAR EL ESTUDIANTE PORQUE ESTA RELACIONADO CON UNA MATERIA', 
              'error'
            );
            console.error('Error al eliminar la habitación', error);
          }
        );

      }
    });
    
  }

  guardarCambios() {
    this.registroSeleccionado.fecha_matricula = parseDate(this.registroSeleccionado.fecha_matricula);
    console.log('Registro seleccionado:', this.registroSeleccionado);
    this.estudianteServ.actualizar(this.registroSeleccionado).subscribe(
      (data: Estudiante) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se han guardado los cambios correctamente.',
        });
        this.cargarHabitaciones();
        this.isModalOpen = false;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al guardar los cambios.',
        });
        console.error('Error al guardar los cambios', error);
      }
    );
    }
    

    filtrarBusqueda() {
      if (this.searchTerm) {
        this.filteredHabitaciones = this.habitaciones.filter(habitacion =>
          habitacion.id_estudiante.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          habitacion.cedula.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          habitacion.nombre.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          habitacion.apellido.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          habitacion.categoria.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          habitacion.direccion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          // Convertir la fecha a un formato que se pueda comparar con la cadena de búsqueda
          new Date(habitacion.fecha_matricula).toLocaleDateString('en-CA') // Formato 'YYYY-MM-DD'
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredHabitaciones = this.habitaciones;
      }
      
    }

    
    
}
function parseDate(dateString: string): Date {
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Meses en JavaScript van de 0 a 11
  const year = parseInt(parts[2], 10);
  
  return new Date(year, month, day);
}



