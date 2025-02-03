import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Centralizing all route paths in a constant object for better maintainability
const ROUTES = {
  login: '/auth',
  dashboard: '/dashboard',
};

// Guard for unauthenticated users (users who are not logged in)
const unAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getAuthToken().pipe(
    map((authToken) => {
      if (authToken) {
        // If authenticated, redirect to the dashboard and prevent access to login
        router.navigateByUrl(ROUTES.dashboard);
        return false;
      }
      // If no token found, allow access to unauthenticated routes (e.g., login page)
      return true;
    }),
    catchError(() => {
      // If there's an error (e.g., token retrieval failure), allow access
      return of(true);
    })
  );
};

// Guard for authenticated users (users who are logged in)
const authenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getAuthToken().pipe(
    map((authToken) => {
      if (authToken) {
        // If authenticated, allow access to the route
        return true;
      }
      // If not authenticated, redirect to the login page and deny access
      router.navigateByUrl(ROUTES.login);
      return false;
    }),
    catchError(() => {
      // If an error occurs (e.g., token fetch fails), redirect to login and deny access
      router.navigateByUrl(ROUTES.login);
      return of(false);
    })
  );
};

// Main Auth Guard function, determining which guard to use based on the route
export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // Defining routes that do not require authentication (e.g., login page)
  const unauthenticatedRoutes = [ROUTES.login];

  // If the requested route is an unauthenticated route, use the unauthenticated guard
  if (unauthenticatedRoutes.includes(state.url)) {
    return unAuthenticatedGuard(next, state);
  }

  // Otherwise, enforce authentication with the authenticated guard
  return authenticatedGuard(next, state);
};
