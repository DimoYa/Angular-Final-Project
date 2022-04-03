import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  avatar!: string;
  defaultAvatarPath!: string;

  ngOnInit(): void {
    this.avatar = this.userService.returnUserPhoto();
    this.defaultAvatarPath = '../../../assets/profile.png';
  }
}
