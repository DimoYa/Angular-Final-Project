import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import UserModel from 'src/app/core/models/user-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  defaultAvatarPath!: string;
  currentUser$: Observable<UserModel> = this.userService.getUser$(
    this.authenticationService.returnId()
  );

  subscription: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.defaultAvatarPath = '../../../assets/profile.png';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateUser(userId: string): void {
    this.router.navigate([`/profile/edit/${userId}`]);
  }

  deleteUser(userId: string): void {
    this.subscription.add(
      this.userService.deleteUser$(userId).subscribe(() => {
        this.authenticationService.handleLogout();
        this.router.navigate(['/home']);
      })
    );
  }
}
