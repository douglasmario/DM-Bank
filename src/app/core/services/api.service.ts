import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MOCK_API_DATA } from '../../mocks/api.mock';
import { MOCK_USER } from '../../mocks/auth.mock';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private useMock = environment.useMock;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.useMock ? (this.getMockData(endpoint) as Observable<T>) : this.http.get<T>(`https://api.example.com/${endpoint}`);
  }

  post<T, U>(endpoint: string, data: U): Observable<T> {
    return this.useMock ? (this.postMockData(endpoint, data) as Observable<T>) : this.http.post<T>(`https://api.example.com/${endpoint}`, data);
  }

  getUsers(): Observable<User[]> {
    return this.get<User[]>('users');
  }

  private getMockData(endpoint: string): Observable<unknown> {
    if (endpoint === 'users') {
      return of(MOCK_API_DATA.users);
    }
    return of([]);
  }

  private postMockData<T>(endpoint: string, data: T): Observable<unknown> {
    if (endpoint === 'login') {
      return of({ token: MOCK_USER.token });
    }
    return of({});
  }
}
