import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AdminLayoutComponent} from './shared/component/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./shared/auth.guard";
import {SearchPipe} from "./shared/pipe/search.pipe";
import {SingUpComponent} from './sing-up/sing-up.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {UserProfileModalComponent} from './user-profile/user-profile-modal/user-profile-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MatInputModule} from "@angular/material/input";
import {FireBaseService} from "./shared/services/fireBase.service";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'sing-up', component: SingUpComponent},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]},
      {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]}
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    SingUpComponent,
    UserProfileComponent,
    UserProfileModalComponent,
    ChangePasswordComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, FireBaseService],
})

export class AdminModule {
}
