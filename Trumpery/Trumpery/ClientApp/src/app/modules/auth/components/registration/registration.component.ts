import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EMAIL_REGEXP, PASSWORD_REGEXP } from 'src/app/shared/validators/user.validators';
import { ILoginRequest } from '../../models/login.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEXP)]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]],
      passwordAgain: ['', [Validators.required, Validators.pattern(PASSWORD_REGEXP)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (this.registerForm.controls['password'].value != this.registerForm.controls['passwordAgain'].value) {
      this.registerForm.markAllAsTouched();
      window.alert('A megadott jelszavak nem egyeznek!');
      return;
    }
    this.router.navigate(['/', 'login']);
  }

}
