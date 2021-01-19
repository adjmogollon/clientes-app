import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    // return this.http.get<Cliente[]>(this.urlEndPoint);
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Cliente[]));
  }

  create(cliente: Cliente): Observable<Cliente> {
    console.log('Ingresando al service');
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {
      headers: this.httpHeaders,
    });
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error('ng-console: ' + e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.urlEndPoint}/${cliente.id}`,
      cliente,
      { headers: this.httpHeaders }
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
