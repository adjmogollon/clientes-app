import { Component } from '@angular/core';
import { AuthService } from '../users/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title: String = 'App Angular 11';

  constructor(public authService: AuthService, private router: Router) {}

  public logout(): void {
    let username = this.authService.user.username;
    this.authService.loguot();

    Swal.fire(
      'Logout',
      `Hola ${username}, has cerrado sesion con exito`,
      'success'
    );
    this.router.navigate(['/login']);
  }
}
