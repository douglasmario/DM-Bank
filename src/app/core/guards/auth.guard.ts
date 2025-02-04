import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

const ROUTES = {
  login: '/auth',
  dashboard: '/dashboard',
};

// Guard for unauthenticated users (e.g., login page)
const unAuthenticatedGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getAuthToken().pipe(
    map((authToken) => {
      if (authToken) {
        router.navigateByUrl(ROUTES.dashboard);
        return false;
      }
      return true;
    }),
    catchError(() => of(true))
  );
};

// Guard for authenticated users (protects private routes)
const authenticatedGuard: CanActivateFn = (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getAuthToken().pipe(
    map((authToken) => {
      if (authToken) {
        return true;
      }
      router.navigateByUrl(ROUTES.login);
      return false;
    }),
    catchError(() => {
      router.navigateByUrl(ROUTES.login);
      return of(false);
    })
  );
};

// Main Auth Guard function to apply the correct guard based on the route
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const unauthenticatedRoutes = [ROUTES.login];

  return unauthenticatedRoutes.includes(state.url) ? unAuthenticatedGuard(route, state) : authenticatedGuard(route, state);
};
