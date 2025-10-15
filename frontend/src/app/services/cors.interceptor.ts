import { HttpInterceptorFn } from '@angular/common/http';

export const corsInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[CorsInterceptor] Request: ${req.method} ${req.url}`);
  
  // Clone the request and add CORS headers
  const corsReq = req.clone({
    setHeaders: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization',
    }
  });
  
  return next(corsReq);
};