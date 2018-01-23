import { Injectable } from '@angular/core';

import { HttpService } from '../../shared/services/http.service';
import { AuthDataService } from './authData.service';
import { AuthData } from './authData';


@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpService,
    private authDataService: AuthDataService
  ) { }

  login(loginObj: any) {
    return this.http
    .get('login?email=' + loginObj.email + '&password=' + loginObj.password)
    .toPromise()
    .then(this.extractData.bind(this))
    .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth');
  }

  private extractData(res: any) {
    const authData = new AuthData(res.token, res.user);
    this.authDataService.setAuthData(authData);
  }

  private handleError(error: any): Promise<any> {
    if (error.status >= 500) {
      console.error('Internal error', error);
    }
    return Promise.reject(error.message || error);
}


}
