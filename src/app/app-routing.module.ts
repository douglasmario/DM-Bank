import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'; // Import AuthGuard to protect certain routes
import { NotFoundComponent } from './features/not-found/not-found.component'; // Import the 404 component for unmatched routes

// Define the application's routing configuration
export const routes: Routes = [
  {
    path: 'auth', // Path for authentication-related routes
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent // Lazy-load LoginComponent for better performance
      ),
  },
  {
    path: 'dashboard', // Path for the dashboard page
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent // Lazy-load DashboardComponent for better performance
      ),
    canActivate: [AuthGuard], // Protect the dashboard route with AuthGuard to ensure only authenticated users can access
  },
  {
    path: '', // Default route when no path is provided
    redirectTo: '/auth', // Redirect to the login page
    pathMatch: 'full', // Ensure that the full path matches before redirecting
  },
  {
    path: '**', // Wildcard route for handling undefined paths (404)
    component: NotFoundComponent, // Show the NotFoundComponent for unknown routes
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Enabling preloading of lazy-loaded modules
      preloadingStrategy: PreloadAllModules
      // Optional: Preload strategy for performance optimization

    }),
  ],
  exports: [RouterModule], // Export RouterModule to use it throughout the app
})
export class AppRoutingModule {}
