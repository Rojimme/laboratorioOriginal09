import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstudianteForm } from 'src/app/shared/formsModels/estudianteForms';
import { EstudiantesCursos } from 'src/app/shared/models/EstudiantesCursos';
import { EstudianteService } from 'src/app/shared/services/estudiante.service';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosService } from 'src/app/shared/services/cursos.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss']
})
export class MatriculasComponent implements OnInit {
  arrayEstudiantes: EstudiantesCursos[] = [];
  arrayCursos: EstudiantesCursos[] = [];

  constructor(
    public estudianteForm: EstudianteForm,
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  eliminarEstudiante(estudiante: EstudiantesCursos) {
    this.arrayEstudiantes = this.arrayEstudiantes.filter((estud) => estud !== estudiante);
  }

  eliminarCurso(curso: EstudiantesCursos) {
    this.arrayCursos = this.arrayCursos.filter((curs) => curs !== curso);
  }

  abrirDialogEstudiantes(): void {
    const dialogRef = this.dialog.open(EstudianteComponent, {
      width: 'auto',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((eleccion: any) => {
      if (eleccion && eleccion.cedula && !this.existeEstudiante(eleccion.cedula)) {
        const estudiantesCursos: EstudiantesCursos = {
          id: '',
          estudiante: eleccion,
          curso:eleccion
        };
        this.arrayEstudiantes.push(estudiantesCursos);
      }
    });
}

abrirDialogCursos(): void {
  const dialogRef = this.dialog.open(CursosComponent, {
    width: 'auto',
    height: 'auto',
  });

  dialogRef.afterClosed().subscribe((eleccion: any) => {
    if (eleccion && eleccion.id && !this.existeCurso(eleccion.id)) {
      const estudiantesCursos: EstudiantesCursos = {
        id: '',
        estudiante: eleccion,
        curso: eleccion,
      };
      this.arrayCursos.push(estudiantesCursos);
    }
  });
}

private existeEstudiante(cedula: string): boolean {
  return this.arrayEstudiantes.some((estudiante) => estudiante.estudiante.cedula === cedula);
}

private existeCurso(id: string): boolean {
  return this.arrayCursos.some((curso) => curso.curso.id === id);
}




}

