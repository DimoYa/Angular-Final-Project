import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";
import { UserGuard } from "../core/guard/user.guard";
import { AuthenticatedGuard } from "../core/guard/authenticated.guard";

const routes: Routes = [
    { path: 'register',canActivate: [AuthenticatedGuard], component: RegisterComponent },
    { path: 'login',canActivate: [AuthenticatedGuard], component: LoginComponent },
    { path: 'profile',canActivate: [UserGuard], component: ProfileComponent },
    { path: 'profile/edit/:id',canActivate: [UserGuard], component: ProfileUpdateComponent },
  ];
  
  export const AuthenticationRoutingModule = RouterModule.forChild(routes);