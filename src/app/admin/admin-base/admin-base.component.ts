import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Options } from 'angular2-notifications';
import { AdminService } from '../services/admin.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-admin-base',
  templateUrl: './admin-base.component.html',
  styleUrls: ['./admin-base.component.less']
})
export class AdminBaseComponent implements OnInit {

  @ViewChild('navbarButton') navbarButton: any;

  public section: String;
  public notificationOptions: Options;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
    this.notificationOptions = this.notificationService.getOptions();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.section = params.section || 'login';
    });
  }

  closeMenu() {
    this.navbarButton.nativeElement.click();
  }

}
