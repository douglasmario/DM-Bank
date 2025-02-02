import { inject } from '@angular/core';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, mergeMap, of, from } from 'rxjs';
import { AuthService } from '../services/auth.service';


// Centralizing all route paths in a constant object for better maintainability
// TODO: Centralize all route paths in a constants file (e.g., ROUTES) for easier maintenance and to avoid hardcoding paths in multiple places.
const ROUTES = {
  login: '/auth',
  dashboard: '/dashboard',
};

// Guard for unauthenticated users (users who are not logged in)
const unAuthenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router); // Injecting Router service to handle navigation
  return inject(AuthService) // Injecting AuthService to check authentication status
    .getAuthToken() // Fetch authentication token (expected to return an observable)
    .pipe(
      mergeMap((authToken) => {
        if (authToken) {
          // If authenticated, redirect to the dashboard and prevent access to login
          return from(router.navigateByUrl(ROUTES.dashboard)).pipe(mergeMap(() => of(false)));
        }
        // If no token found, allow access to unauthenticated routes (e.g., login page)
        return of(true);
      }),
      catchError(() => of(true)) // If there's an error (e.g., token retrieval failure), allow access
    );
};

// Guard for authenticated users (users who are logged in)
const authenticatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router); // Injecting Router service to handle navigation
  return inject(AuthService) // Injecting AuthService to verify authentication status
    .getAuthToken() // Fetch authentication token (expected to return an observable)
    .pipe(
      mergeMap((authToken) => {
        if (authToken) {
          // If authenticated, allow access to the route
          return of(true);
        }
        // If not authenticated, redirect to the login page and deny access
        return from(router.navigateByUrl(ROUTES.login)).pipe(mergeMap(() => of(false)));
      }),
      catchError(() =>
        // If an error occurs (e.g., token fetch fails), redirect to login and deny access
        from(router.navigateByUrl(ROUTES.login)).pipe(mergeMap(() => of(false)))
      )
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
