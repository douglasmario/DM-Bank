// src/app/core/core.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS here

// Import services, interceptors, and guards
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  imports: [
    CommonModule,     // Essential Angular module for common directives like ngIf, ngFor, etc.
    HttpClientModule  // Support for making HTTP requests globally
  ],
  providers: [
    AuthService,  // Provides authentication methods globally
    ApiService,   // Provides API communication services
    AuthGuard,    // Provides route protection to ensure only authorized users can access certain routes
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Interceptor to add authentication tokens or handle errors globally
      multi: true  // Ensures multiple interceptors can be chained
    }
  ],
  exports: [HttpClientModule]  // Export HttpClientModule so it can be used in other modules if needed
})
export class CoreModule {
  // CoreModule handles global services, interceptors, and guards.
  // It is imported only once in the AppModule to avoid redundant providers.
  // This ensures efficient code and prevents the risk of duplicate service instances.
}
