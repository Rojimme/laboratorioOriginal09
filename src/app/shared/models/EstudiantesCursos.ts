import { Cursos } from "./cursos";
import { Estudiantes } from "./estudiante";



export interface EstudiantesCursos {
  id: string;
  estudiante: Estudiantes;
  curso: Cursos;
}
