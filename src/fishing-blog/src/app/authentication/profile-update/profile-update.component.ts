import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import UserModel from 'src/app/core/models/user-model';
import { UserService } from 'src/app/core/services/user.service';
import { fullNameValidator, phoneNumberValidator } from '../utils';


@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  getCodes = ['359', '124', '152'];
  id: string;
  email: string;
  userData!: UserModel;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
  }
  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.userService.getUser$(this.id)
      .subscribe(data => {
        this.userData = data;
        this.email = this.userData['email'];
        this.updateUserForm.controls['phoneCode'].setValue(this.userData.phoneCode);
      });
  }

  updateUserForm: FormGroup = this.fb.group({
    fullname: new FormControl(null, [Validators.required, fullNameValidator]),
    phoneCode: new FormControl(null),
    phoneNumber: new FormControl(null, phoneNumberValidator),
    photo: new FormControl(this.userData?.phoneCode),
  });

  updateUser(): void {
    const body = this.updateUserForm.value;
    body['email'] = this.email;
    this.userService.updateUser$(body, this.id)
      .subscribe(() => {
        localStorage['photo'] = body['photo'];
        this.router.navigate(['/profile']);
      });
  };

  cancel(): void {
    this.router.navigate(['/profile']);
  }

  get f() {
    return this.updateUserForm.controls;
  };
}
