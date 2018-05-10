import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'angular2-notifications';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {
    this.notificationOptions = this.notificationService.getOptions();
  }

  ngOnInit() {
    if (!this.section) {
      this.route.params.subscribe(params => {
        if (params.section) {
          this.section = params.section;
        } else {
          this.router.navigate(['/admin/overview']);
        }
      });
    }
  }

  closeMenu() {
    this.navbarButton.nativeElement.click();
  }

}
