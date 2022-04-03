import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileUpdateComponent } from "./profile-update/profile-update.component";

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'profile/edit/:id', component: ProfileUpdateComponent },
  ];
  
  export const AuthenticationRoutingModule = RouterModule.forChild(routes);