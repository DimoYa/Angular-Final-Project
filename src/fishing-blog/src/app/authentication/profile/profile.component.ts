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
  isAdmin!: boolean;
  currentUser$: Observable<UserModel>;
  subscription: Subscription = new Subscription();

  private readonly confirmMsg = 'Are you sure that you want to delete your account?';

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.defaultAvatarPath = '../../../assets/profile.png';
    this.currentUser$ = this.userService.getUser$(
      this.authenticationService.returnId()
    );
    this.isAdmin = this.authenticationService.isAdmin();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateUser(userId: string): void {
    this.router.navigate([`/user/profile/edit/${userId}`]);
  }

  deleteUser(userId: string): void {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle(this.confirmMsg);
    confirmBox.setButtonLabels('YES', 'NO');

    this.subscription.add(confirmBox.openConfirmBox$().subscribe((resp) => {
      if (resp.success) {
        this.subscription.add(this.userService.deleteUser$(userId).subscribe(() => {
          this.authenticationService.handleLogout();
          this.router.navigate(['/home']);
        }));
      }
    }));
  }
}
