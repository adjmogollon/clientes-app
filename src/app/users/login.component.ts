import { Component, OnInit } from '@angular/core';
import { User } from './user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  title: string = 'Please Sing In!';
  user: User;
  constructor() {
    this.user = new User();
  }

  ngOnInit(): void {}

  public login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Login Error', 'Empty username or password', 'error');
    }
  }
}
