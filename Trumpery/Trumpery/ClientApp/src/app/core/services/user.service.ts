import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IModifyUserRequest } from 'src/app/modules/auth/models/user.interface';

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
  getUserList(){
    return this.req.get(`user/list`);
  }
  modifyUserName(id, name: IModifyUserRequest){
    return this.req.post(`user/modify/:id`, { userId: id, user:name}).pipe(
      catchError(err => throwError(err)),

    );
  }
}
