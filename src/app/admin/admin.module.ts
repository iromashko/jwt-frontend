import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AdminLayoutComponent, LoginPageComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          {
            path: '',
            redirectTo: '/admin/login',
            pathMatch: 'full',
          },
          {
            path: 'login',
            component: LoginPageComponent,
          },
          {
            path: 'dashboard',
            component: DashboardComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AdminModule {}
