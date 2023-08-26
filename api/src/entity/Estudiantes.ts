import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { EstudianteCursos } from "./EstudianteCursos";



@Entity()
export class Estudiante {
  @PrimaryColumn({ length: 12 })
  cedula: string;

  @Column({ length: 50 })

  nombre: String;

  @Column({ length: 50 })

  apellido1: string;

  @Column({ length: 50 })

  apellido2: string;

  @Column({ type: "date" })

  fechaNac: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => EstudianteCursos, (EstCurso) => EstCurso.estudiante)
  cursos: EstudianteCursos[];

  
}
