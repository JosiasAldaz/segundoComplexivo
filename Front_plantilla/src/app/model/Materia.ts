import { Estudiante } from "./Estudiante";
import { EstudianteMateria } from "./EstudianteMateria";

export class Materia{
    id_materia?:number;
    materia?:string;
    students?:Set<EstudianteMateria>;
}