import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Anibal',
      apellido: 'Mogollon',
      email: 'adjmogollon@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 2,
      nombre: 'Alicia',
      apellido: 'Castillo',
      email: 'alixicastillo59@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 3,
      nombre: 'Anibal',
      apellido: 'Mogollon R',
      email: 'anibalmogollon52@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 4,
      nombre: 'Miguel',
      apellido: 'Cervantes',
      email: 'miguelcervantes@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 5,
      nombre: 'Gabriel',
      apellido: 'Marquez',
      email: 'gabrielmarquez@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 6,
      nombre: 'Alexander',
      apellido: 'Dumas',
      email: 'alexanderdumas@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 7,
      nombre: 'Lyra',
      apellido: 'Belacqua',
      email: 'lyrabelacqua@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 8,
      nombre: 'Marisa',
      apellido: 'Coulter',
      email: 'marisacoulter@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 9,
      nombre: 'Iorek',
      apellido: 'Byrnison',
      email: 'IorekByrnison@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 10,
      nombre: 'Lord',
      apellido: 'Asriel',
      email: 'LordAsriel@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 11,
      nombre: 'Will',
      apellido: 'Parry',
      email: 'WillParry@gmail.com',
      createAt: '2020-12-17',
    },
    {
      id: 12,
      nombre: 'Serafina',
      apellido: 'Pekkala',
      email: 'SerafinaPekkala@gmail.com',
      createAt: '2020-12-17',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
