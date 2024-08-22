import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Habitaciones } from '../model/Habitaciones';
import { Estudiante } from '../model/Estudiante';
import { Materia } from '../model/Materia';

@Injectable({
  providedIn: 'root'
})
export class materiaService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private urlEndPoint:string = environment.urlHost+'api/materia';
  constructor(private http:HttpClient) { }

  getAlertas(): Observable<Materia[]> {
    return this.http.get(`${environment.urlHost}api/materia`).pipe(
      map(Response => Response as Materia[])
    );
  }

  listar(): Observable<Materia[]>{
    return this.http.get<Materia[]>(this.urlEndPoint);
  }

  crear(alerta: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.urlEndPoint, alerta, { headers: this.httpHeaders });
  }

  eliminar(id_punto: number): Observable<Estudiante>{
    return this.http.delete<Estudiante>(`${this.urlEndPoint}/${id_punto}`)
    }

    actualizar(punto: Materia): Observable<Materia> {
    const id_punto = `${this.urlEndPoint}/${punto.id_materia}`;
    return this.http.put<Materia>(id_punto, punto, { headers: this.httpHeaders});
    }

}