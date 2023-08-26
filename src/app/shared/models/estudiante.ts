import { EstudiantesCursos } from "./EstudiantesCursos";


export interface Estudiantes {
  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNac: Date;
  estado: boolean;
  cursos: EstudiantesCursos[];
}
