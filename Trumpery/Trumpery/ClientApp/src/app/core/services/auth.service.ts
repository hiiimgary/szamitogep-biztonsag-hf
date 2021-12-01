import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ILoginRequest } from 'src/app/modules/auth/models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin = true;

  constructor() { }

  login(payload: ILoginRequest) {
    return of(null);
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }
}
