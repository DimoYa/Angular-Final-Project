import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator } from '../utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.errorMessage = '';
    const { email, password } = this.loginFormGroup.value;

    const body = {
      email: email,
      password: password,
    }

    console.log(body);
    this.loginFormGroup.reset();
  }

  get f() {
    return this.loginFormGroup.controls;
  }
}

