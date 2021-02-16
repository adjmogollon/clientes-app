import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Crear Cliente';
  public cliente: Cliente = new Cliente();
  public regiones: Region[];
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCliente();
    this.cargarRegiones();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getCliente(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public cargarRegiones(): void {
    this.clienteService
      .getRegiones()
      .subscribe((regiones) => (this.regiones = regiones));
  }

  public create(): void {
    console.log('Clicked');
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      (response) => {
        this.route.navigate(['/clientes']);
        Swal.fire(
          'Nuevo Cliente',
          `Cliente ${this.cliente.nombre} creado son exito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void {
    console.log(this.cliente);
    this.cliente.facturas = null;
    this.clienteService.update(this.cliente).subscribe(
      (response) => {
        this.route.navigate(['/clientes']);
        Swal.fire(
          'Cliente Actualizado',
          `Cliente ${this.cliente.nombre} actualizado con exito`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backed: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
  public compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
