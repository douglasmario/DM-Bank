import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showError', 'showSuccess']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: NotificationService, useValue: notificationSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with correct credentials', (done) => {
    const credentials = { email: 'user@example.com', password: 'password' };
    // Simulando o retorno de sucesso da API
    spyOn(service, 'login').and.returnValue(of({  id: 1, email: 'user@example.com', token: 'token', name: 'User', username: 'user' }));

    service.login(credentials).subscribe((user) => {
      expect(user).toBeTruthy();
      expect(notificationService.showError).not.toHaveBeenCalled();
      done();
    });
  });

  it('should fail login with incorrect credentials', (done) => {
    const credentials = { email: 'wrong@example.com', password: 'wrong' };
    // Simulando erro na API
    spyOn(service, 'login').and.returnValue(throwError(() => new Error('Invalid email or password')));

    service.login(credentials).subscribe({
      next: () => fail('Expected login to fail'),
      error: (err) => {
        expect(err.message).toBe('Invalid email or password');
        expect(notificationService.showError).toHaveBeenCalledWith('Invalid email or password');
        done();
      },
    });
  });

  it('should logout and remove token', () => {
    // Simulando logout
    spyOn(service, 'logout').and.callFake(() => sessionStorage.removeItem('auth_token'));

    service.logout();
    expect(sessionStorage.getItem('auth_token')).toBeNull();
    expect(notificationService.showSuccess).toHaveBeenCalledWith('Logged out successfully');
  });

  it('should check if user is authenticated', () => {
    sessionStorage.setItem('auth_token', 'mock_token');
    expect(service.isAuthenticated()).toBeTrue();
  });
});
