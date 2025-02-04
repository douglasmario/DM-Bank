import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const notificationSpy = jasmine.createSpyObj('NotificationService', ['showError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, MatSnackBarModule, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with remembered email', () => {
    sessionStorage.setItem('rememberedEmail', 'user@example.com');
    component.ngOnInit();
    expect(component.loginForm.value.email).toBe('user@example.com');
  });

  it('should call AuthService.login on valid form submission', () => {
    const credentials = { email: 'user@example.com', password: 'password', rememberMe: false };
    authService.login.and.returnValue(of({ id: 1, email: 'user@example.com', token: 'token', name: 'User', username: 'user' }));
    component.loginForm.setValue(credentials);
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email: 'user@example.com', password: 'password' });
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error on invalid form submission', () => {
    component.loginForm.setValue({ email: '', password: '', rememberMe: false });
    component.onSubmit();

    expect(notificationService.showError).toHaveBeenCalledWith('Please fill out the form correctly.');
    expect(authService.login).not.toHaveBeenCalled();
  });
});
