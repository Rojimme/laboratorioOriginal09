import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from 'src/app/shared/services/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss'],
})
export class EstudianteComponent {
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellido1',
    'apellido2',
    'fechaNac',
    'agregar',
  ];

  constructor(private srvEstudiantes: EstudianteService) { }

  ngOnInit() {
    this.srvEstudiantes.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (error) => {
        alert(error);
      }
    );
  }
}
