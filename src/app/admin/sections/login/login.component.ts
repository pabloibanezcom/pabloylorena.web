import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'ng2-smart-auth';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  @Output() onInit: EventEmitter<boolean> = new EventEmitter<boolean>();

  error: string;
  loginObj: any = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.logout();
  }

  ngOnInit() {
    this.onInit.emit(true);
  }

  login() {
    this.authenticationService.login(environment.api_url + 'login', this.loginObj)
      .then(res => {
        const targetUrl = this.authenticationService.getAuth().data.role === 'admin' ? '/admin/overview' : '/admin/notifications';
        this.router.navigate([targetUrl]);
      })
      .catch(err => {
        if (err.status === 404) {
          this.error = 'Usuario y contraseña no encontrados';
        }
      });
  }

}
