import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError } from 'rxjs/operators'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandlerInterceptorService implements HttpInterceptor {

  constructor(public toastService: ToastrService,
    private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((success) => {
      if (success instanceof HttpResponse) {

        let currentUrl = this.router.url;
        if (currentUrl.includes('login')) {
          this.toastService.success('Login successfully');
        } else if (currentUrl.includes('register')) {
          this.toastService.success('Register successfully');
        } else if (currentUrl.includes('create')) {
          this.toastService.success('Article successfully created');
        }
      }

    }), catchError((err) => {
      this.toastService.error(err.error.description)
      throw err;
    })
    )
  }
}


