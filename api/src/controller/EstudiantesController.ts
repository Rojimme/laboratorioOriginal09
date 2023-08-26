import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Estudiante } from "../entity/Estudiantes";
import { EstudianteCursos } from "../entity/EstudianteCursos";

class EstudianteController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const estRepo = AppDataSource.getRepository(Estudiante);
      const listaEstudiantes = await estRepo.find({
        where: { estado: true },
        relations: { cursos: true },
      });
      if (listaEstudiantes.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "No fueron encontrados resultados" });
      }
      return resp.status(200).json(listaEstudiantes);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const cedula = req.params['cedula'];
      if (!cedula) {
        return resp
          .status(404)
          .json({ mensaje: 'No se indica la cédula del estudiante' });
      }
      const estudianteRepo = AppDataSource.getRepository(Estudiante);
      let estudiante;
      try {
        estudiante = await estudianteRepo.findOneOrFail({
          where: { cedula: cedula },
          relations: { cursos: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encontro el estudiante con esa cédula' });
      }
      return resp.status(200).json(estudiante);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { cedula, nombre, apellido1, apellido2, fechaNac, cursos } =
        req.body;
      if (
        !cedula ||
        !nombre ||
        !apellido1 ||
        !apellido2 ||
        !fechaNac ||
        !cursos
      ) {
        return resp.status(400).json({ mensaje: 'Faltan datos requeridos.' });
      }

      const estudianteRepo = AppDataSource.getRepository(Estudiante);
      const estudiante = await estudianteRepo.findOne({ where: { cedula: cedula } });
      if (estudiante) {
        return resp
          .status(400)
          .json({ mensaje: 'El estudiante ya existe en la base de datos' });
      }

      const hoy = new Date();
      const cumpleanos = new Date(fechaNac);
      let edad = hoy.getFullYear() - cumpleanos.getFullYear();
      const monthDiff = hoy.getMonth() - cumpleanos.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && hoy.getDate() < cumpleanos.getDate())
      ) {
        edad--;
      }
      if (edad < 18) {
        return resp
          .status(400)
          .json({ mensaje: 'El estudiante debe ser mayor de 18 años.' });
      }

      const uniqueCursos = new Set();
      for (const curso of cursos) {
        if (uniqueCursos.has(curso.id)) {
          return resp
            .status(400)
            .json({ mensaje: 'No se permiten cursos repetidos.' });
        }
        uniqueCursos.add(curso.id);
      }

      const listaCursos = cursos.map((curs) => {
        const estCurso = new EstudianteCursos();
        estCurso.estudiante = cedula;
        estCurso.curso = curs.id;
        return estCurso;
      });

      let nuevoEstudiante = new Estudiante();
      nuevoEstudiante.cedula = cedula;
      nuevoEstudiante.nombre = nombre;
      nuevoEstudiante.apellido1 = apellido1;
      nuevoEstudiante.apellido2 = apellido2;
      nuevoEstudiante.fechaNac = fechaNac;
      nuevoEstudiante.cursos = listaCursos;
      nuevoEstudiante.estado = true;
      try {
        await estudianteRepo.save(nuevoEstudiante);
        return resp.status(201).json({ mensaje: 'Estudiante creado' });
      } catch (error) {
        return resp.status(400).json({ mensaje: 'Error al guardar.' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
}

export default EstudianteController;
