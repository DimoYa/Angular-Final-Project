import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import UserModel from 'src/app/core/models/user-model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit, OnDestroy {

  users!: UserModel[];
  subscription: Subscription = new Subscription();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.subscription.add(this.adminService.getAllUsers$().subscribe((data) => {
      this.users = data;
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  disableUser(userId: string): void {
    this.subscription.add(this.adminService.suspendUser$(userId).subscribe(() => {
      this.subscription.add(this.adminService.getAllUsers$().subscribe((data) => {
        this.users = data;
      }))
    }));
  }

  enableUser(userId: string): void {
    this.subscription.add(this.adminService.restoreUser$(userId).subscribe(() => {
      this.subscription.add(this.adminService.getAllUsers$().subscribe((data) => {
        this.users = data;
      }))
    }));
  }
}
