import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import UserModel from 'src/app/core/models/user-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmBoxInitializer } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  defaultAvatarPath!: string;
  currentUser$: Observable<UserModel>;

  subscription: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.defaultAvatarPath = '../../../assets/profile.png';
    this.currentUser$ = this.userService.getUser$(
      this.authenticationService.returnId()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateUser(userId: string): void {
    this.router.navigate([`/profile/edit/${userId}`]);
  }

  deleteUser(userId: string): void {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are you sure that you want to delete your account');
    confirmBox.setButtonLabels('YES', 'NO');

    const subscription = confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.success) {
        this.userService.deleteUser$(userId).subscribe(() => {
          this.authenticationService.handleLogout();
          this.router.navigate(['/home']);
        });
      }
      subscription.unsubscribe();
    });
  }
}
