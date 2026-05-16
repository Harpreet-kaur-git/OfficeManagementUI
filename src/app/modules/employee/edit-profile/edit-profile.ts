import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.css'
})
export class EditProfileComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      name: ['John Doe', Validators.required],
      email: ['john.doe@company.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567', Validators.required],
      address: ['123 Tech Lane, Silicon Valley, CA 94025'],
      emergencyContactName: ['Jane Doe'],
      emergencyContactRelation: ['Spouse'],
      emergencyContactPhone: ['+1 (555) 987-6543']
    });
  }

  saveProfile() {
    if (this.profileForm.valid) {
      console.log('Saving changes...', this.profileForm.value);
      this.router.navigate(['/employee/view-profile']);
    }
  }

  cancel() {
    this.router.navigate(['/employee/view-profile']);
  }
}