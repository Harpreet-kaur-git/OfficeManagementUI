import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emp-dashboard.html',
  styleUrls: ['./emp-dashboard.css']
})
export class EmpDashboard {
  attendanceStats = [
    { label: 'Present Days', value: 18, color: '#10b981' },
    { label: 'Absent Days', value: 2, color: '#ef4444' },
    { label: 'Leaves Taken', value: 1, color: '#f59e0b' },
    { label: 'Late Logins', value: 3, color: '#6366f1' }
  ];

  records = [
    { date: '2023-10-06', status: 'Present', login: '09:05 AM', logout: '06:15 PM', hours: '9.1h' },
    { date: '2023-10-05', status: 'Present', login: '08:55 AM', logout: '06:30 PM', hours: '9.5h' },
    { date: '2023-10-04', status: 'Late', login: '09:45 AM', logout: '06:45 PM', hours: '9.0h' },
    { date: '2023-10-03', status: 'Absent', login: '--', logout: '--', hours: '0h' },
    { date: '2023-10-02', status: 'Present', login: '09:00 AM', logout: '06:00 PM', hours: '9.0h' },
    { date: '2023-10-01', status: 'Leave', login: '--', logout: '--', hours: '0h' },
  ];
}