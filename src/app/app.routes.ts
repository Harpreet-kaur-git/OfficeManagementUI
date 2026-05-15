import { Routes } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';
import { AdminDashboardComponent } from './dashboards/admin/admin-dashboard.component';
import { EmpDashboard } from './dashboards/employee/emp-dashboard/emp-dashboard';
import { HrDashboard } from './dashboards/hr/hr-dashboard/hr-dashboard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './common/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminDashboardComponent,
        canActivate: [RoleGuard],
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [RoleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'hr-dashboard',
        component: HrDashboard,
        canActivate: [RoleGuard],
        data: { role: 'HR' },
      },
      {
        path: 'emp-dashboard',
        component: EmpDashboard,
        canActivate: [RoleGuard],
        data: { role: 'Employee' },
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
