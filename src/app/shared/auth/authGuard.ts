import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['admin/login']);
            return false;
        }
    }
}
