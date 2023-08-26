import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { EstudiantesComponent } from './estudiantes.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { EstudianteComponent } from './matriculas/estudiante/estudiante.component';
import { CursosComponent } from './matriculas/cursos/cursos.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    EstudiantesComponent,
    MatriculasComponent,
    EstudianteComponent,
    CursosComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    MaterialModule
  ]
})
export class EstudiantesModule { }
