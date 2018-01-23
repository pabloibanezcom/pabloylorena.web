import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LoadingSpinnerService } from './loading-spinner.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    constructor(
        private loadingSpinnerService: LoadingSpinnerService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // start our loader here
        this.loadingSpinnerService.startRequest();

        return next.handle(req).do((event: HttpEvent<any>) => {
            // if the event is for http response
            if (event instanceof HttpResponse) {
                // stop our loader here
                this.loadingSpinnerService.completeRequest();
            }

        }, (err: any) => {
            // if any error (not for just HttpResponse) we stop our loader bar
            this.loadingSpinnerService.completeRequest();
        });
    }

}
