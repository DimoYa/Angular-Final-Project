import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { appKey, appSecret } from 'src/app/kinvey.tokens';
import UserModel from '../models/user-model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${btoa(`${appKey}:${appSecret}`)}`,
          'Content-Type': 'application/json',
        },
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Kinvey ${localStorage.getItem('authtoken')}`,
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (event.url.endsWith('login')) {
            console.log('login/register happened');
            const newlyLoggedUser: UserModel = event.body;
            this.authenticationService.handleLogin(newlyLoggedUser);
          } else if (event.url.endsWith('_logout')) {
            this.authenticationService.handleLogout();
          }
        }
      })
    );
  }
}
