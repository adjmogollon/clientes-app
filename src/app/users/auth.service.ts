import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) {}

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';
    const credentials = btoa('angularapp' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + credentials,
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);
    console.log(params.toString());

    return this.http.post(urlEndpoint, params.toString(), {
      headers: httpHeaders,
    });
  }

  saveUser(access_token: string): void {
    let paylaod = this.getPayload(access_token);
    this._user = new User();

    this._user.firstname = paylaod.firstname;
    this._user.lastname = paylaod.lastname;
    this._user.email = paylaod.email;
    this._user.username = paylaod.user_name;
    this._user.createAt = paylaod.createAt;
    this._user.authorities = paylaod.authorities;
    console.log(this._user);
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem('token', this._token);
  }

  getPayload(access_token: string): any {
    if (access_token != null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.getPayload(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
}
