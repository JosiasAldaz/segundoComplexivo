import { Component, OnInit } from '@angular/core';
import { TiposService } from '../services/tipos.service';
import { tipos } from '../model/tipos';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { materiaService } from '../services/materia.service';
import { Materia } from '../model/Materia';

// Establecer las fuentes globalmente
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
tipos: Materia[];
searchTerm: string = '';
filteredHabitaciones: any[] = [];
registroSeleccionado: any = {};
tipoParaPDF: tipos = {};
isModalOpen = false;
searchText: string = '';
  constructor(private tiposervicio:TiposService,private materiaServie:materiaService) { }

  ngOnInit(): void {
    this.cargarMaterias();
  }

  // Cierra la ventana modal
  closeModal() {
    this.isModalOpen = false; 
  }

  //CARGA LA LISTA DE TIPOS DE HABITACIONES
  cargarMaterias(): void {
    this.materiaServie.getAlertas().subscribe(
      (data: Materia[]) => {
        console.log('Datos cargados:', data);
        this.tipos = data;
        this.filteredHabitaciones = data;
      },
      (error) => {
        console.error('Error al cargar las habitaciones', error);
      }
    );
  }

  //MUESTRA EL MODAL PARA EDITAR
  editar(tipo: any) {
    this.registroSeleccionado = { ...tipo }; 
    this.isModalOpen = true;
    console.log('Registro seleccionado:', this.registroSeleccionado);
    
  }

  //ELIMINA EL TIPO DE HABITACION
  eliminar(id_number: number): void {
    console.log('ID del tipo seleccionado:', id_number);
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, ¡no podrás recuperar esta MATERIA!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //LLAMAR 
                this.materiaServie.eliminar(id_number).subscribe(
                  () => {
                    Swal.fire(
                      'Eliminado',
                      'La habitación ha sido eliminada.',
                      'success'
                    );
                    // Opcional: Actualizar la lista de habitaciones
                    this.cargarMaterias(); // Recarga los datos si es necesario
                  },
                  (error) => {
                    Swal.fire(
                      'Error',
                      'No se puede eliminar la materia porque esta relacionada con estudiantes.',
                      'error'
                    );
                    console.error('Error al eliminar la habitación', error);
                  }
                );
      }
    });
  }

  guardarCambios() {
    this.materiaServie.actualizar(this.registroSeleccionado).subscribe(
      (data: Materia) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se han guardado los cambios correctamente.',
        });
        this.cargarMaterias();
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

    createPdf(tipo: any) {
      this.registroSeleccionado = { ...tipo }; 
      // Llamada al servicio para buscar el tipo de habitación por ID
      console.log('ID del tipo seleccionado:', this.registroSeleccionado.id_tipo);
      this.tiposervicio.buscar(this.registroSeleccionado.id_tipo).subscribe(
        (data: any) => {
          // Asignar el objeto de tipo obtenido a la variable tipoParaPDF
          this.tipoParaPDF = data;
    
          const pdfDefinition: any = {
            content: [
              { text: 'Listado de Habitaciones por Tipo', style: 'header' },
              {
                text: `Tipo: ${this.tipoParaPDF.nombre}`, // Título del tipo de habitación
                style: 'subheader',
                margin: [0, 10, 0, 5]
              },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', '*', '*', '*'],
                  body: [
                    // Encabezados de la tabla
                    ['Descripción', 'Nº habitación', 'Precio', 'Estado'],
                    // Filas de la tabla basadas en las habitaciones del tipo
                    ...this.tipoParaPDF.habitaciones.map(habitacion => ([
                      habitacion.descripcion,
                      habitacion.numeroHabitacion,
                      habitacion.precioHabitacion,
                      habitacion.estado
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
              subheader: {
                fontSize: 14,
                bold: true
              },
              tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
              }
            }
          };
    
          const pdf = pdfMake.createPdf(pdfDefinition);
          pdf.download('reporte_habitaciones.pdf');
        },
        (error) => {
          console.error('Error al buscar el tipo de habitación', error);
        }
      );
    }
    
    
    filtrarBusqueda() {
      if (this.searchTerm) {
        this.filteredHabitaciones = this.tipos.filter(tipo =>
          tipo.id_materia.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          tipo.materia.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredHabitaciones = this.tipos;
      }
    }
  

}
