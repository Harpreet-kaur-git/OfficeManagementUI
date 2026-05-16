import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-relieve-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './relieve-employee.html',
})
export class RelieveEmployee {
  relieveForm: FormGroup;
  isSubmitting = false;

  // Mock list of active employees for selection
  activeEmployees = [
    { id: 'EMP001', name: 'John Doe' },
    { id: 'EMP002', name: 'Jane Smith' },
    { id: 'EMP003', name: 'Robert Brown' },
    { id: 'EMP005', name: 'Michael Wilson' },
  ];

  reasons = [
    'Voluntary Resignation',
    'Termination',
    'Retirement',
    'Contract End',
    'Better Opportunity',
    'Personal Reasons'
  ];

  settlementStatuses = ['Pending', 'In Progress', 'Completed'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.relieveForm = this.fb.group({
      employeeId: ['', Validators.required],
      relievingDate: [new Date().toISOString().substring(0, 10), Validators.required],
      reason: ['', Validators.required],
      settlementStatus: ['Pending', Validators.required],
      
      // Formalities Checklist
      handoverDocs: [false],
      returnedAssets: [false],
      idCardReturned: [false],
      accessRevoked: [false],
      
      remarks: ['']
    });
  }

  onSubmit() {
    if (this.relieveForm.valid) {
      this.isSubmitting = true;
      console.log('Relieving Employee Processed:', this.relieveForm.value);
      
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard/hr-dashboard']);
      }, 1500);
    }
  }
}