import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminUserManagementComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
