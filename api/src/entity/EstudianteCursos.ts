    import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
    import { Estudiante } from "./Estudiantes";
    import { Curso } from "./Curso";


    @Entity()
    export class EstudianteCursos {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.cursos)
    estudiante: Estudiante;

    @ManyToOne(() => Curso, (curso) => curso.estudiantes)
    curso: Curso;

    }
