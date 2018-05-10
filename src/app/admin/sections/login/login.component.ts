import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'ng2-smart-auth';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  error: string;
  loginObj: any = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  login() {
    this.authenticationService.login(environment.api_url + 'login', this.loginObj)
      .then(res => {
        this.router.navigate(['/admin/overview']);
      })
      .catch(err => {
        if (err.status === 404) {
          this.error = 'Usuario y contraseña no encontrados';
        }
      });
  }

}
