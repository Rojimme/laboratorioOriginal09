import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteCursos } from "./EstudianteCursos";




@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 50 })
  nombre: String;

  @Column({default: true})
  estado: boolean;

  @OneToMany(() => EstudianteCursos, (EstCurso) => EstCurso.curso)
  estudiantes: EstudianteCursos[];
}
