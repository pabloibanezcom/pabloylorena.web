import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthDataService } from './authData.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authDataService: AuthDataService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authData = this.authDataService.getAuthData();
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ` + (authData ?  authData.token : '')
            }
        });
        return next.handle(request);
    }
}
