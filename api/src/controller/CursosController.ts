import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Curso } from "../entity/Curso";

class CursoController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const cursoRepo = AppDataSource.getRepository(Curso);
      const listaCursos = await cursoRepo.find({
        where: { estado: true },
      });
      if (listaCursos.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: "'No fueron encontrados resultados" });
      }
      return resp.status(200).json(listaCursos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  
}

export default CursoController;
