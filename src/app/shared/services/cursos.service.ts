import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Cursos } from '../models/cursos';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cursos[]> {
    return this.http
      .get<Cursos[]>('http://localhost:3000/curso')
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error';
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }

    return throwError(() => new Error(mensaje));
  }
}
