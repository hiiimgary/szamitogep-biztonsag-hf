import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { IModifyUserRequest } from '../models/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private fb: FormBuilder, 
    private userService: UserService) { }

  isEditing = false;
  editIndex = null;
  editProfileForm: FormGroup;
  users = [];
  editUsername = '';

  requestName: IModifyUserRequest = {
    name: ''
  }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      username: [''],
    });
    this.userService.getUserList().subscribe((res:any) => this.users = res)
  }

  edit() {
    this.isEditing = true;
  }

  save(index) {
    this.isEditing = false;
    this.requestName.name = this.editProfileForm.controls['username'].toString();
    return this.userService.modifyUserName(this.users[index].id, this.requestName).subscribe();
    //TODO
  }

  enableEditMethod(e, i) {
    this.isEditing = true;
    this.editIndex = i;
    this.editUsername = this.users[i].name;
    this.editProfileForm.controls['username'].setValue(this.editUsername);
  }

  cancel() {
    this.isEditing = false;
  }

}
