import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import UserModel from 'src/app/core/models/user-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { emailValidator, fullNameValidator, passwordMatch, phoneNumberValidator } from '../utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  errorMessage: string = '';
  getCodes = ['359', '124', '152'];
  subscription: Subscription; 

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
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();   
   }
  
  register(): void {
    this.errorMessage = '';
    const { email, fullname, phoneCode, phoneNumber, photo, passwords } = this.registerFormGroup.value;

    const body  = {
      username: email,
      fullname: fullname,
      phoneNumber: phoneCode + phoneNumber,
      photo: photo,
      password: passwords.password
    }

    this.subscription = this.authenticationService.register$(body).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      complete: () => {
        console.log('register stream completed');
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
    this.registerFormGroup.reset();
  }

  get f() {
    return this.registerFormGroup.controls;
  }
}