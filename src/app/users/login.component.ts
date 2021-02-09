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

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      Swal.fire(
        'Login',
        `Hola ${this.authService.user.username} ya estas autenticado!`,
        'info'
      );
      this.router.navigate(['/clientes']);
    }
  }

  public login(): void {
    console.log(this.user);
    if (this.user.username == null || this.user.password == null) {
      Swal.fire('Login Error', 'Empty username or password', 'error');
    }

    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response);

        this.authService.saveUser(response.access_token);
        this.authService.saveToken(response.access_token);

        let user = this.authService.user;

        this.router.navigate(['/clientes']);
        Swal.fire(
          'Login',
          `Hola ${user.username}, has iniciado sesion con exito`,
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    );
  }
}
