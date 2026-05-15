import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  constructor() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const savedTheme = localStorage.getItem('office-theme') || 'dark';
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    }
  }
}
