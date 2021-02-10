import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthorityGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }
      let authority = route.data['authority'] as string;
      console.log(authority);
      if(this.authService.hasAuthority(authority)){
        return true;
      }
      Swal.fire(
        'Acceso denegado',
        `Hola ${this.authService.user.username} no tienes acceso a este recurso`,
        'warning'
      );
      this.router.navigate(['/clientes']);
      return false;
  }

}
