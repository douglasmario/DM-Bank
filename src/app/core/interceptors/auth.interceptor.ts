import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

// AuthInterceptor is an HTTP interceptor that adds an authentication token to outgoing requests
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the authentication token from localStorage
    const token = localStorage.getItem('auth_token');

    // Check if a token exists in localStorage
    if (token) {
      // If a token is found, clone the original request and add the Authorization header with the token
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}` // Attach the token in the Authorization header
        }
      });

      // Continue processing the request with the new cloned request that has the token
      return next.handle(clonedRequest);
    }

    // If no token is found, continue with the original request without modifying headers
    return next.handle(req);
  }
}
