import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';

import { environment } from '../../../environments/environment';
import { AuthData } from '../models/authData';

@Injectable()
export class AuthenticationService {

  authData: AuthData;
  requestedUrl: string;

  constructor(
    private fb: FacebookService,
    private router: Router
  ) {
    const fbParams: InitParams = {
      appId: environment.fb_app_id,
      xfbml: true,
      version: 'v2.10'
    };
    this.fb.init(fbParams);
  }

  public login() {
    // Call the show method to display the widget.
    this.fb.login().then(
      (response: LoginResponse) => {
        this.getFacebookData(response);
      },
      (error: any) => console.error(error)
    );
  }

  public getToken() {
    this.authData = JSON.parse(localStorage.getItem('auth'));
    if (this.authData) {
      if (new Date(this.authData.expirationDate) > new Date()) {
        return this.authData.token;
      }
      localStorage.removeItem('auth');
      return null;
    }
    return null;
  }

  public logout() {
    localStorage.removeItem('auth');
  }

  public setRequestedUrl(url: string): void {
    this.requestedUrl = url;
  }

  // Facebook API call for getting user data
  private getFacebookData(response: LoginResponse) {
    this.authData = new AuthData(response.authResponse.accessToken,
      response.authResponse.userID, this.getExpirationDate(response.authResponse.expiresIn));
    localStorage.setItem('auth', JSON.stringify(this.authData));
    const url = this.requestedUrl === '' || !this.requestedUrl ? '/portfolio' : this.requestedUrl;
    this.router.navigate([url]);
  }

  private getExpirationDate(expiresIn: number): Date {
    const result = new Date();
    result.setSeconds(result.getSeconds() + expiresIn);
    return result;
  }

}
