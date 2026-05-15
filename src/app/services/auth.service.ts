import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface TokenClaims {
  username?: string;
  role?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'office-access-token';
  private readonly usernameKey = 'office-user-name';
  private readonly roleKey = 'office-user-role';
  private readonly usernameClaim =
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
  private readonly roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  constructor(private router: Router) {}

  get token(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  get username(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    const stored = localStorage.getItem(this.usernameKey);
    if (stored) {
      return stored;
    }
    const claims = this.claims;
    return this.getClaimValue(claims, this.usernameClaim, 'username');
  }

  get role(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    const stored = localStorage.getItem(this.roleKey);
    if (stored) {
      return stored;
    }
    const claims = this.claims;
    return this.getClaimValue(claims, this.roleClaim, 'role');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  get dashboardUrl(): string {
    const role = this.normalizeRole(this.role);

    if (role === 'admin') {
      return '/dashboard/admin-dashboard';
    }

    if (role === 'hr') {
      return '/dashboard/hr-dashboard';
    }

    return '/dashboard/emp-dashboard';
  }

  setToken(token: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(this.tokenKey, token);

    const parsed = this.parseToken(token);
    const username = this.getClaimValue(parsed, this.usernameClaim, 'username');
    const role = this.getClaimValue(parsed, this.roleClaim, 'role');

    if (username) {
      localStorage.setItem(this.usernameKey, username);
    }

    if (role) {
      localStorage.setItem(this.roleKey, role);
    }
  }

  clearToken(): void {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.roleKey);
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  get claims(): TokenClaims | null {
    const token = this.token;
    if (!token) {
      return null;
    }
    return this.parseToken(token);
  }

  private parseToken(token: string): TokenClaims {
    const parts = token.split('.');
    if (parts.length < 2) {
      return {};
    }

    try {
      const payload = parts[1];
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(normalized)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json) as TokenClaims;
    } catch {
      return {};
    }
  }

  private getClaimValue(claims: TokenClaims | null, ...keys: string[]): string | null {
    if (!claims) {
      return null;
    }

    for (const key of keys) {
      const value = claims[key];
      if (typeof value === 'string' && value) {
        return value;
      }
    }

    return null;
  }

  private normalizeRole(role: string | null): string {
    return (role ?? '').trim().toLowerCase();
  }
}
