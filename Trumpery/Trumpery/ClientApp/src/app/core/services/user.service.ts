import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly req: HttpClient
  ) { }

  getCurrentUser(){
    return this.req.get(`auth/is-logged-in`);
  }
}
