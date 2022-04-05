import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageBusInterceptor implements HttpInterceptor {
  constructor(public toastService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((success) => {
        if (success instanceof HttpResponse && req.method !== 'GET') {
          if (req.method === 'POST') {
            let method = success.url.split('/').pop();
            method = method.includes('kid') ? 'register' : method;
            this.toastService.success(`${method} successfully ${method == 'article' ? 'created': ''}`);
          }
          if (req.method === 'DELETE') {
            this.toastService.success('Successfully deleted');
          }
          if (req.method === 'PUT') {
            this.toastService.success('Successfully updated');
          }
        }
      }),
      catchError((err) => {
        this.toastService.error(err.error.description);
        throw err;
      })
    );
  }
}
