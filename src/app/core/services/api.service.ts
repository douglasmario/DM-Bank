import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment configuration to access settings like 'useMock'
import { MOCK_API_DATA } from '../../mocks/api.mock'; // Import mock data for API responses
import { MOCK_USER } from '../../mocks/auth.mock'; // Import mock user data for authentication purposes
import { User } from '../models/user.model'; // User model interface

@Injectable({
  providedIn: 'root', // This makes ApiService available globally across the app
})
export class ApiService {
  private useMock = environment.useMock; // Determine whether to use mock data or make real HTTP requests based on environment config

  constructor(private http: HttpClient) {}

  // Generic GET method to fetch data from an endpoint
  get<T>(endpoint: string): Observable<T> {
    // Check if 'useMock' is true, if so, return mock data. Otherwise, make a real HTTP GET request
    return this.useMock ? this.getMockData(endpoint) : this.http.get<T>(`https://api.example.com/${endpoint}`);
  }

  // Generic POST method to send data to an endpoint
  post<T>(endpoint: string, data: any): Observable<T> {
    // Check if 'useMock' is true, if so, return mock data. Otherwise, make a real HTTP POST request
    return this.useMock ? this.postMockData(endpoint, data) : this.http.post<T>(`https://api.example.com/${endpoint}`, data);
  }

  // Fetch users from the API using the generic GET method
  getUsers(): Observable<User[]> {
    // Make a GET request to the 'users' endpoint. The result will be a list of users.
    return this.get<User[]>('users');
  }

  // Private method to simulate GET requests with mock data
  private getMockData(endpoint: string): Observable<any> {
    // Check if the endpoint matches 'users' and return mock users data, otherwise return an empty array
    if (endpoint === 'users') {
      return of(MOCK_API_DATA.users); // Return mock users data when 'users' endpoint is requested
    }
    return of([]); // For other endpoints, return an empty array
  }

  // Private method to simulate POST requests with mock data
  private postMockData(endpoint: string, data: any): Observable<any> {
    // If the endpoint is 'login', return a mock login token. Otherwise, return an empty object.
    if (endpoint === 'login') {
      return of({ token: MOCK_USER.token }); // Return a mock login token for the 'login' endpoint
    }
    return of({}); // Return an empty object for other endpoints
  }
}
