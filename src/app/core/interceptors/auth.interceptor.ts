import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'seu-token-aqui'; // Exemplo de token
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` }
  });
  return next(authReq);
};
