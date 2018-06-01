import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'angular2-notifications';
import { AuthData, AuthenticationService } from 'ng2-smart-auth';
import { AdminService, NotificationService } from '../admin-core';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.less']
})
export class AdminBaseComponent implements OnInit {

  @ViewChild('navbarButton') navbarButton: any;

  @Input() section: string;

  public notificationOptions: Options;
  public authData: AuthData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
    this.refreshAuthData();
    this.notificationOptions = this.notificationService.getOptions();
  }

  ngOnInit() {
    if (!this.section) {
      this.route.params.subscribe(params => {
        if (params.section) {
          this.checkIfSectionAllowed(params.section);
        } else {
          const targetUrl = this.authData.data.role === 'admin' ? '/admin/overview' : '/admin/notifications';
          this.router.navigate([targetUrl]);
        }
      });
    }
  }

  refreshAuthData() {
    this.authData = this.authenticationService.getAuth();
  }

  closeMenu() {
    this.navbarButton.nativeElement.click();
  }

  private checkIfSectionAllowed(section: string) {
    if (section !== 'notifications' && this.authData.data.role !== 'admin') {
      this.router.navigate(['/admin/login']);
    } else {
      this.section = section;
    }
  }

}
