import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ILoginRequest } from 'src/app/modules/auth/models/login.interface';
import { IRegistrationForm } from 'src/app/modules/auth/models/register.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin = true;

  constructor(
    private readonly req: HttpClient,
    private readonly storageService: StorageService
  ) { }

  login(payload: ILoginRequest) {
    return this.req.post(`api/user/login`, {Email: payload.email, Password: payload.password}).pipe(
      catchError(err => throwError(err)),
      tap((res: {token}) => {
        this.storageService.setCookie('jwt_token', res.token);
      })
    );
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  register(payload: IRegistrationForm) {
    return this.req.post(`api/user/create`, {
      Email: payload.email,
      Password: payload.password,
      Name: payload.username,
      Recaptcha: payload.recaptcha
    });
  }
}
