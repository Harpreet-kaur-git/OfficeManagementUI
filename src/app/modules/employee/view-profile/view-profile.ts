import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css'
})
export class ViewProfileComponent {
  // Mock data for display - in a real app, this would come from a service
  employeeProfile = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    role: 'Senior Software Engineer',
    department: 'Engineering & Technology',
    employeeId: 'EMP-2023-0841',
    joinDate: new Date('2022-03-15'),
    location: 'Remote / New York Office',
    manager: 'Sarah Jenkins',
    status: 'Active',
    address: '123 Tech Lane, Silicon Valley, CA 94025',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=256'
  };

  constructor() {}
}