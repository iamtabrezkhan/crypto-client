import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }
}