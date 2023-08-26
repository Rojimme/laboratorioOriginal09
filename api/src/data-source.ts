import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Curso } from './entity/Curso';
import { Estudiante } from './entity/Estudiantes';
import { EstudianteCursos } from './entity/EstudianteCursos';




export const AppDataSource= new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'laboratorio9',
  synchronize: true,
  logging: false,
  entities: [ 
    Curso,
    Estudiante,
    EstudianteCursos
  ],
  migrations: [],
  subscribers: [],
});
