import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './announcements.html',
})
export class AnnouncementsComponent {
  announcementForm: FormGroup;
  isSubmitting = false;
  successMessage = false;

  targetAudiences = [
    { label: 'HR Only', value: 'HR' },
    { label: 'Employees Only', value: 'Employee' },
    { label: 'Both', value: 'Both' },
  ];

  priorities = ['Low', 'Medium', 'High'];

  constructor(private fb: FormBuilder) {
    this.announcementForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      target: ['', Validators.required],
      priority: ['Medium', Validators.required],
      expiryDate: [''],
    });
  }

  onSubmit() {
    if (this.announcementForm.valid) {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        this.successMessage = true;
        this.announcementForm.reset({ priority: 'Medium' });
        setTimeout(() => this.successMessage = false, 5000);
      }, 1500);
    }
  }
}