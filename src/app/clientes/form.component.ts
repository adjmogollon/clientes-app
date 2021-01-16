import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public titulo: string = 'Crear Cliente';
  public cliente: Cliente = new Cliente();
  public errores: string[];

  constructor() {}

  ngOnInit(): void {}

  public create(): void {
    console.log('Clicked create!');
    console.log(this.cliente);
  }

  public update(): void {
    console.log('Clicked update!');
    console.log(this.cliente);
  }
}
