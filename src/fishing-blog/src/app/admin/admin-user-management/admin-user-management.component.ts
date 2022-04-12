import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/core/models/user-model';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  users!: UserModel[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllUsers$().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    })
  }

  deleteUser(userId: string): void {

  }
}
