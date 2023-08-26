import { EstudiantesCursos } from "./EstudiantesCursos";


export interface Cursos {
    id: string;
    nombre: string;
    estado: boolean;
    estudiantes: EstudiantesCursos;
  }
  