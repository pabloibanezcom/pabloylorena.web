import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from '../services/admin.service';
import { DataService } from '../../shared/services/data.service';
import { Invitation } from '../../shared/models/invitation';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.less']
})
export class InvitationComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  invitation: Invitation;
  url: string;
  defaultDedication: string;
  dedication: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService,
    private dataService: DataService
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params.invitationId) {
        this.subscriptions.push(this.adminService.getInvitation(params.invitationId).subscribe(res => {
          this.invitation = res;
          this.setDedication();
          this.url = 'wwww.pabloylorena.com/' + this.invitation.guid;
        }));
      }
    }));
    this.subscriptions.push(
      this.dataService.get('default-dedication').subscribe(data => {
        this.defaultDedication = data.htmlText;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }

  print(): void {
    window.print();
  }

  private setDedication() {
    if ((!this.invitation.dedication || this.invitation.dedication !== '') && !this.invitation.useGroupDedication) {
      this.dedication = this.defaultDedication;
    }
    if (this.invitation.useGroupDedication) {
      this.subscriptions.push(this.adminService.getGroup(String(this.invitation.group)).subscribe(res => {
        this.dedication = res.invitationDedication;
      }));
    }
    if (this.invitation.dedication) {
      this.dedication = this.invitation.dedication;
    }
  }

}
