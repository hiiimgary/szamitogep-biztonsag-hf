import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  currentUser = {
    email: "test@test.com",
    username: "testuser123"
  }

  ngOnInit(): void {

  }

  logout() {

  }
}
