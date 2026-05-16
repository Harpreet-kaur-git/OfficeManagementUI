import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  employeeForm: FormGroup;
  isSubmitting = false;

  roles = [
    'Software Engineer',
    'Senior Software Engineer',
    'Product Manager',
    'QA Engineer',
    'UI/UX Designer',
    'DevOps Engineer',
    'HR Manager',
  ];

  departments = ['Engineering', 'Product', 'Design', 'Human Resources', 'Operations'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,12}$')]],
      role: ['', Validators.required],
      department: ['', Validators.required],
      joinDate: [new Date().toISOString().substring(0, 10), Validators.required],
      employeeId: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isSubmitting = true;
      // Simulate API call
      console.log('Adding Employee:', this.employeeForm.value);
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/hr-dashboard']);
      }, 1500);
    }
  }
}