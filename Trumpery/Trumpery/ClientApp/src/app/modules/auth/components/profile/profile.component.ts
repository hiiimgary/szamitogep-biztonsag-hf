import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, 
    private authService: AuthService) { }

  currentUser = { 
    email: "", 
    username:""
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((res:any) => {
      this.currentUser.email = res.email,
      this.currentUser.username = res.name
    } );
  }

  logout() {
    this.authService.logout();
  }
}
