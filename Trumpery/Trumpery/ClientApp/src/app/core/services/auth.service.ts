import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ILoginRequest } from 'src/app/modules/auth/models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor() { }

  login(payload: ILoginRequest) {
    this.isLoggedIn = true;
    return of(null);
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }
}
