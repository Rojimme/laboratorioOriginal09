
import { Router } from "express";
import EstudiantesController from "../controller/EstudiantesController";



const routes = Router();


routes.get("", EstudiantesController.getAll);
routes.get("", EstudiantesController.getById);
routes.post("", EstudiantesController.add);



export default routes;
