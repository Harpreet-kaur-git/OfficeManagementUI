import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.auth.isAuthenticated) {
      return this.router.parseUrl('/login');
    }

    if (this.isDashboardLanding(state.url)) {
      return this.router.parseUrl(this.auth.dashboardUrl);
    }

    const requiredRole = route.data['role'];
    if (!requiredRole || this.hasAccess(String(requiredRole))) {
      return true;
    }

    return this.router.parseUrl(this.auth.dashboardUrl);
  }

  private hasAccess(requiredRole: string): boolean {
    const role = (this.auth.role ?? '').trim().toLowerCase();
    const required = requiredRole.trim().toLowerCase();

    if (required === 'employee') {
      return role !== 'admin' && role !== 'hr';
    }

    return role === required;
  }

  private isDashboardLanding(url: string): boolean {
    return url === '/dashboard' || url === '/dashboard/';
  }
}
