import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ILoginRequest } from 'src/app/modules/auth/models/login.interface';
import { IRegistrationForm } from 'src/app/modules/auth/models/register.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin = true;
  isLoggedIn = false;

  constructor(
    private readonly req: HttpClient,
    private readonly storageService: StorageService
  ) { }

  login(payload: ILoginRequest) {
    this.isLoggedIn = true;
    return this.req.post(`auth/login`, { email: payload.email, password: payload.password }).pipe(
      catchError(err => throwError(err)),
      tap((res: { token }) => {
        this.storageService.setCookie('jwt_token', res.token);
      })
    );
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  register(payload: IRegistrationForm) {
    return this.req.post(`auth/register`, {
      email: payload.email,
      password: payload.password,
      name: payload.username,
      recaptcha: payload.recaptcha
    });
  }

  getLoginStatus() {
    return this.req.get(`auth/is-logged-in`).pipe(
      map((res) => {
        console.log(res);
      })
    );
  }
}
