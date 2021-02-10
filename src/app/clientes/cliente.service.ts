import { Injectable } from '@angular/core';
// import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import { Region } from './region';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private addAuthorizationHeader(): HttpHeaders {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNotAuthorized(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.loguot();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status == 403) {
      Swal.fire(
        'Acceso denegado',
        `Hola ${this.authService.user.username} no tienes acceso a este recurso`,
        'warning'
      );
      this.router.navigate(['/clientes']);
      return true;
    }
  }

  getRegiones(): Observable<Region[]> {
    return this.http
      .get<Region[]>(this.urlEndPoint + '/regiones', {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          this.isNotAuthorized(e);
          return throwError(e);
        })
      );
  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService tap1');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // let datePipe = new DatePipe('es');
          // cliente.createAt = datePipe.transform(cliente.createAt, 'fullDate');
          return cliente;
        });
        return response;
      }),
      tap((response) => {
        console.log('ClienteService tap2');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http
      .get<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNotAuthorized(e)) {
            return throwError(e);
          }
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.cliente as Cliente),
        catchError((e) => {
          if (this.isNotAuthorized(e)) {
            return throwError(e);
          }

          if (e.status === 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  update(cliente: Cliente): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNotAuthorized(e)) {
            return throwError(e);
          }
          if (e.status === 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.addAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNotAuthorized(e)) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;

    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
        headers: httpHeaders,
      }
    );

    return this.http.request(req).pipe(
      catchError((e) => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }
}
