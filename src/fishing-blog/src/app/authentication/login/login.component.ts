import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { emailValidator } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  errorMessage: string = '';
  subscription: Subscription;

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    this.errorMessage = '';
    const { email, password } = this.loginFormGroup.value;

    const body = {
      username: email,
      password: password,
    };

    this.subscription = this.authenticationService
      .login$(body)
      .subscribe((data) => {
        this.authenticationService.authtoken = data['_kmd']['authtoken'];
        localStorage.setItem('authtoken', data['_kmd']['authtoken']);
        localStorage.setItem('username', data['username']);
        localStorage.setItem('id', data['_id']);
        localStorage.setItem('photo', data['photo']);
        data['_kmd']['roles'] !== undefined && data['_kmd']['roles'].length != 0
          ? localStorage.setItem('isAdmin', 'true')
          : localStorage.setItem('isAdmin', 'false');
        this.router.navigate(['/home']);
      });
  }

  get f() {
    return this.loginFormGroup.controls;
  }
}
