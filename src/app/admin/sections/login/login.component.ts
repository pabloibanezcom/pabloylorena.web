import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/auth/authentication.service';

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
  ) { }

  login() {
    this.authenticationService.login(this.loginObj)
      .then(res => {
        this.router.navigate(['/admin/invitations']);
      })
      .catch(err => {
        if (err.status === 404) {
          this.error = 'Usuario y contraseña no encontrados';
        }
      });
  }

  someMethod(event: any) {
    console.log('Pulsa enter');
  }

}
