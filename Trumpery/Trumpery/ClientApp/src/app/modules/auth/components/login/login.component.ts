import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from 'src/app/shared/validators/user.validators';
import { ILoginRequest } from '../../models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: ILoginRequest = this.loginForm.value;

    this.authService.login(payload).subscribe((login: any) => {
      this.router.navigate(['/', 'animations']);
    }, err => {
      window.alert('Valami hiba történt');
    });
  }

}

