import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-employee-location',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-employee-location.html',
})
export class ManageEmployeeLocation implements OnInit {
  locationForm: FormGroup;
  isSaving = false;
  saveSuccess = false;

  constructor(private fb: FormBuilder) {
    this.locationForm = this.fb.group({
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      radius: [100, [Validators.required, Validators.min(10)]], // Meters
    });
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('office_location');
    if (saved) {
      this.locationForm.patchValue(JSON.parse(saved));
    }
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.locationForm.patchValue({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      });
    }
  }

  saveLocation(): void {
    if (this.locationForm.valid) {
      this.isSaving = true;
      localStorage.setItem('office_location', JSON.stringify(this.locationForm.value));
      setTimeout(() => {
        this.isSaving = false;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      }, 1000);
    }
  }
}