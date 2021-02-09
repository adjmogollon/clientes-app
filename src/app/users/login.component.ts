import { Component, OnInit } from '@angular/core';
import { User } from './user';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  title: string = 'Please Sing In!';
  user: User;
  constructor(private authService: AuthService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {}

  public login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Login Error', 'Empty username or password', 'error');
    }
    this.authService.login(this.user).subscribe((response) => {
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split('.')[1]));
      console.log(payload);
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Login',
        `Hola ${payload.user_name}, has iniciado sesion con exito`,
        'success'
      );
    });
  }
}
