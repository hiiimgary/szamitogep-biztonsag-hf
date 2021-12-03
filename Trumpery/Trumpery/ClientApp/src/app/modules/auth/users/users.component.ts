import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  isEditing = false;
  editIndex = null;
  editProfileForm: FormGroup;
  users = ['test', 'test2', 'test3'];
  editUsername = '';

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      username: [''],
    });
  }

  edit() {
    this.isEditing = true;
  }

  save() {
    this.isEditing = false;
    //TODO
  }

  enableEditMethod(e, i) {
    this.isEditing = true;
    this.editIndex = i;
    this.editUsername = this.users[i];
    this.editProfileForm.controls['username'].setValue(this.editUsername);
  }

  cancel() {
    this.isEditing = false;
  }

}
