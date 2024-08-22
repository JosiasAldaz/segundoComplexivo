import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Habitaciones } from '../model/Habitaciones';
import { Estudiante } from '../model/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class estudianteService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlEndPoint:string = environment.urlHost+'api/estudiantes';
  constructor(private http:HttpClient) { }

  getAlertas(): Observable<Estudiante[]> {
    return this.http.get(`${environment.urlHost}api/estudiantes`).pipe(
      map(Response => Response as Estudiante[])
    );
  }

  listar(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(this.urlEndPoint);
  }

  crear(alerta: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.urlEndPoint, alerta, { headers: this.httpHeaders });
  }

  eliminar(id_punto: number): Observable<Estudiante>{
    return this.http.delete<Estudiante>(`${this.urlEndPoint}/${id_punto}`)
    }

    actualizar(punto: Estudiante): Observable<Estudiante> {
    const id_punto = `${this.urlEndPoint}/${punto.id_estudiante}`;
    return this.http.put<Estudiante>(id_punto, punto, { headers: this.httpHeaders});
    }

    getMateriasPorEstudiante(cedula: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlEndPoint}/materias/${cedula}`);
    }
}