import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursosService } from 'src/app/shared/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
 
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'agregar',
  ];

  constructor(private srvCursos: CursosService) { }

  ngOnInit() {
    this.srvCursos.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (error) => {
        alert(error);
      }
    );
  }
}
