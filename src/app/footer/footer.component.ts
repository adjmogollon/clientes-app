import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.component.css'],
})
export class Footercomponent {
  public autor: any = { nombre: 'Anibal', apellido: 'Mogollon' };
}
