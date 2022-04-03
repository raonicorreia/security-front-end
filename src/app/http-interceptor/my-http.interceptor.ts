import { LoginService } from './../service/login/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/login')) {
      let token = 'Bearer ' + this.loginService.getToken();
      const authReq = request.clone({
        headers: request.headers
          .set('Authorization', token)
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
