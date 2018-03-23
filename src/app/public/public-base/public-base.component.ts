import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TemplateService } from '../services/template.service';
import { InvitationService } from '../services/invitation.service';
import { Invitation } from '../../shared/models/invitation';
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-public-base',
  templateUrl: './public-base.component.html',
  styleUrls: ['./public-base.component.less']
})
export class PublicBaseComponent implements OnInit, OnDestroy {

  public invitation: Invitation;

  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private invitationService: InvitationService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      if (params.invitationGuid) {
        this.invitationService.getInvitationByGuid(params.invitationGuid).subscribe(res => {
          this.invitation = res;
          this.analyticsService.trackStart(this.invitation);
        });
      } else {
        this.invitation = new Invitation();
      }
    });
    this.templateService.init();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  rsvpOpened() {
    this.analyticsService.trackAttendanceOpened(this.invitation);
  }

}
