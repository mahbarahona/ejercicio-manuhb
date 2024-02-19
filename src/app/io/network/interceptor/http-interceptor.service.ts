import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const apiRequest = req.clone({
    headers: req.headers
      .set('accept', 'application/json')
      .set('X-RapidAPI-Key', environment.api.key)
      .set('X-RapidAPI-Host', environment.api.app_host),
  });
  return next(apiRequest);
};
