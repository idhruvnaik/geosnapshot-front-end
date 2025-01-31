import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const selectedTable = localStorage.getItem('selectedTable');
    if (!selectedTable) {
      this.router.navigate(['/customer']);
      return false;
    }
    return true;
  }
}
