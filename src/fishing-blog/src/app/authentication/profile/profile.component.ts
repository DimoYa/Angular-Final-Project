import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  avatar!: string;
  defaultAvatarPath!: string;

  ngOnInit(): void {
    this.avatar = this.authenticationService.returnUserPhoto();
    this.defaultAvatarPath = '../../../assets/profile.png';
  }
}
