import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged: boolean;
  isAdmin: boolean;
  avatar: string;
  username: string;
  isExpanded: boolean = false;
  defaultAvatarPath: string = '../../../assets/profile.png';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.isLogged = this.authenticationService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();
    this.avatar = this.userService.returnUserPhoto();
    this.username = this.userService.returnUserName();
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }

  logout(): void {
    this.authenticationService.logout$().subscribe(() => {
      localStorage.clear();
      this.authenticationService.currentAuthtoken = '';
      this.router.navigate(['/login']);
    });
  }
}
