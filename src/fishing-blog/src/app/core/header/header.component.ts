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
  isExpanded: boolean;
  defaultAvatarPath: string = '../../../assets/profile.png';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.isLogged = this.authenticationService.isLoggedIn();
    this.isAdmin = this.authenticationService.isAdmin();
    this.avatar = this.authenticationService.returnUserPhoto();
    this.username = this.authenticationService.returnUserName();
    this.isExpanded = false;
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
    console.log(this.isExpanded);
  }

  logout(): void {
    this.authenticationService.logout$().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
