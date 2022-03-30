import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, fullNameValidator, passwordMatch, phoneNumberValidator } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';
  getCodes = ['359', '124', '152'];

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'email': new FormControl(null, [Validators.required, emailValidator]),
    'fullname': new FormControl(null, [Validators.required, fullNameValidator]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [Validators.required, passwordMatch(this.passwordControl)]),
    }),
    'phoneCode': new FormControl(this.getCodes[0]),
    'phoneNumber': new FormControl(null, phoneNumberValidator),
    'photo': new FormControl(null)
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void { }

  register(): void {
    this.errorMessage = '';
    console.log(this.registerFormGroup.value);
    const { email, fullname, passwords, phoneCode, phoneNumber, photo } = this.registerFormGroup.value;

    const body = {
      email: email,
      fullname: fullname,
      password: passwords.password,
      phoneNumber: phoneCode + phoneNumber,
      photo: photo
    }

    console.log(body);

    this.registerFormGroup.reset();
  }

  get f() {
    return this.registerFormGroup.controls;
  }
}