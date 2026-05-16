import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mark-attendence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mark-attendence.html',
  styleUrl: './mark-attendence.css',
})
export class MarkAttendence implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  location: GeolocationPosition | null = null;
  isCheckedIn: boolean = false;
  isProcessing: boolean = false;
  outOfRangeError: string | null = null;
  distanceToOffice: number | null = null;

  private timerId: any;
  private watchId: number | null = null;

  ngOnInit(): void {
    // Initialize the real-time clock
    this.timerId = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    // Start watching the live location immediately
    if (typeof window !== 'undefined' && navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.location = position;
        },
        (error) => {
          console.error('Geolocation Error:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
    if (this.watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  markAttendance(): void {
    this.outOfRangeError = null;
    if (!this.location || this.isProcessing) return;

    // Check Geofencing against HR configuration
    const savedLocation = localStorage.getItem('office_location');
    if (savedLocation) {
      const office = JSON.parse(savedLocation);
      const distance = this.calculateDistance(
        this.location.coords.latitude,
        this.location.coords.longitude,
        office.latitude,
        office.longitude
      );

      this.distanceToOffice = Math.round(distance);

      if (distance > office.radius) {
        this.outOfRangeError = `You are out of the office perimeter (${this.distanceToOffice}m away). Please enter the office area to mark attendance.`;
        return;
      }
    }

    this.isProcessing = true;
    // Simulated network delay for recording attendance
    setTimeout(() => {
      this.isCheckedIn = !this.isCheckedIn;
      this.isProcessing = false;
    }, 1500);
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}