import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Crear Cliente';
  public cliente: Cliente = new Cliente();
  public errores: string[];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {}

  public create(): void {

    this.clienteService
      .create(this.cliente)
      .subscribe((respose) => this.router.navigate(['/clientes']));
  }

  public update(): void {
    console.log('Clicked update!');
    console.log(this.cliente);
  }
}
