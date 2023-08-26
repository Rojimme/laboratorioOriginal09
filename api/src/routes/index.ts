

import { Router } from 'express';
import cursos from './cursos';
import estudiantes from './estudiantes';



const routes = Router();


routes.use("/estudiante", estudiantes);
routes.use("/curso", cursos);




export default routes;
