import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../admin/services/authentication.service';
import { NotificationService } from '../../admin/services/notification.service';


@Injectable()
export class HttpService {

  private api_url: string;

  constructor(
    private http: Http,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.api_url = environment.api_url;
  }

  get(url: string) {
    const headers = new Headers();
    const options = new RequestOptions({ headers: this.appendToken(headers) });
    return this.http.get(this.api_url + url, options)
      .map((response: Response) => response.json());
  }

  post(url: string, bodyObj: any) {
    const body = JSON.stringify(bodyObj);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: this.appendToken(headers) });
    return this.http.post(this.api_url + url, body, options)
    .map((response: Response) => response.json());
  }

  put(url: string, bodyObj: any) {
    const body = JSON.stringify(bodyObj);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: this.appendToken(headers) });
    return this.http.put(this.api_url + url, body, options);
  }

  private appendToken(headers: Headers): Headers {
    const token = this.authService.getToken();
    if (token) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

}
