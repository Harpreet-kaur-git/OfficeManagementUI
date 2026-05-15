import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() openSidebar = new EventEmitter<void>();
  theme = 'dark';

  constructor(private authService: AuthService) {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('office-theme') : null;
    this.theme = stored === 'light' ? 'light' : 'dark';
    this.applyTheme();
  }

  get dashboardLabel(): string {
    const role = (this.authService.role ?? '').trim().toLowerCase();

    if (role === 'admin') {
      return 'Admin dashboard';
    }

    if (role === 'hr') {
      return 'HR dashboard';
    }

    return 'Employee dashboard';
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('office-theme', this.theme);
    }
    this.applyTheme();
  }

  private applyTheme() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
      document.documentElement.classList.toggle('light', this.theme === 'light');
    }
  }
}
