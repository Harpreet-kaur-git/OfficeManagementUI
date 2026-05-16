import { Routes } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';
import { AdminDashboardComponent } from './dashboards/admin/admin-dashboard.component';
import { EmpDashboard } from './dashboards/employee/emp-dashboard/emp-dashboard';
import { HrDashboard } from './dashboards/hr/hr-dashboard/hr-dashboard';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './common/login/login.component';
import { MarkAttendence } from './modules/employee/mark-attendence/mark-attendence';
import { ViewProfileComponent } from './modules/employee/view-profile/view-profile';
import { AddEmployee } from './modules/hr/add-employee/add-employee';
import { RelieveEmployee } from './modules/hr/relieve-employee/relieve-employee';
import { EditProfileComponent } from './modules/employee/edit-profile/edit-profile';
import { ManageEmployeeLocation } from './modules/hr/manage-employee-location/manage-employee-location';
import { ReportsComponent } from './modules/admin/reports/reports';
import { AnnouncementsComponent } from './modules/admin/announcements/announcements';

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
      {
        path: 'profile',
        component: ViewProfileComponent,
        canActivate: [RoleGuard],
        data: { role: 'Employee' },
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [RoleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        canActivate: [RoleGuard],
        data: { role: 'Admin' },
      },
      
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [RoleGuard],
        data: { role: 'Employee' },
      },
    ],
  },
  {
    path: 'employee',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: 'mark-attendance',
        component: MarkAttendence,
        canActivate: [RoleGuard],
        data: { role: 'Employee' },
      },
      {
        path: 'manage-location',
        component: ManageEmployeeLocation,
        canActivate: [RoleGuard],
        data: { role: 'hr' },
      },
       {
        path: 'view-profile',
        component: ViewProfileComponent,
        canActivate: [RoleGuard],
        data: { role: 'Employee' },
      },
       {
        path: 'edit-profile',
        component: EditProfileComponent,
        canActivate: [RoleGuard],
        data: { role: 'Employee' },
      },
    ],
  },
   {
    path: 'hr',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: 'add-employee',
        component: AddEmployee,
        canActivate: [RoleGuard],
        data: { role: 'hr' },
      },
      {
        path: 'relieve-employee',
        component: RelieveEmployee,
        canActivate: [RoleGuard],
        data: { role: 'hr' },
      },
      {
        path: 'manage-location',
        component: ManageEmployeeLocation,
        canActivate: [RoleGuard],
        data: { role: 'hr' },
      },
      
    ],
  },
   {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: 'analytics',
        component: ReportsComponent,
        canActivate: [RoleGuard],
        data: { role: 'Admin' },
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        canActivate: [RoleGuard],
        data: { role: 'Admin' },
      },
    ]
    },

  { path: '**', redirectTo: 'login' },
];
