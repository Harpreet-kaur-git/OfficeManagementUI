import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  private auth = inject(AuthService);

  role = this.auth.role;

  get userRole(): string {
    return (this.role ?? '').trim().toLowerCase();
  }

  get isEmployee(): boolean {
    return this.userRole !== 'admin' && this.userRole !== 'hr' && this.userRole !== '';
  }

  toggleCollapsed() {
    this.collapsedChange.emit(!this.collapsed);
  }
}
