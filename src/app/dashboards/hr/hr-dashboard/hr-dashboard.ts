import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hr-dashboard.html',
  styleUrls: ['./hr-dashboard.css']
})
export class HrDashboard {
  stats = [
    { label: 'Total Employees', value: 1250, icon: '👥', color: '#3b82f6' },
    { label: 'Joined (Month)', value: 45, icon: '📈', color: '#10b981' },
    { label: 'Relieved (Month)', value: 12, icon: '📉', color: '#ef4444' },
    { label: 'Open Roles', value: 28, icon: '💼', color: '#8b5cf6' }
  ];

  chartData = [
    { month: 'Jan', joined: 30, relieved: 10 },
    { month: 'Feb', joined: 45, relieved: 15 },
    { month: 'Mar', joined: 25, relieved: 8 },
    { month: 'Apr', joined: 50, relieved: 20 },
    { month: 'May', joined: 35, relieved: 12 },
    { month: 'Jun', joined: 60, relieved: 18 },
  ];

  employees = [
    { id: 'EMP001', name: 'John Doe', role: 'Software Engineer', date: '2023-10-01', status: 'Active' },
    { id: 'EMP002', name: 'Jane Smith', role: 'Product Manager', date: '2023-10-05', status: 'Active' },
    { id: 'EMP003', name: 'Robert Brown', role: 'UI/UX Designer', date: '2023-10-12', status: 'Active' },
    { id: 'EMP004', name: 'Emily Davis', role: 'QA Lead', date: '2023-10-15', status: 'On Leave' },
    { id: 'EMP005', name: 'Michael Wilson', role: 'DevOps Engineer', date: '2023-10-20', status: 'Active' },
  ];

  maxChartValue = 70;

  getBarHeight(value: number): string {
    return `${(value / this.maxChartValue) * 100}%`;
  }
}