import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Invitation } from '../../shared/models/invitation';
import { DataService } from '../../shared/services/data.service';
import { AdminService } from '../admin-core';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.less']
})
export class InvitationComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[];
  invitation: Invitation;
  url: string;
  defaultDedication: any;
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
          this.url = 'www.pabloylorena.com/' + this.invitation.guid;
        }));
      }
    }));
    this.subscriptions.push(
      this.dataService.get('default-dedication').subscribe(data => {
        this.defaultDedication = {
          single: data.htmlTextSingle,
          plural: data.htmlTextPlural
        };
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
    if (this.invitation.dedicationMode === 'default') {
      this.dedication = !this.invitation.isPlural ? this.defaultDedication.single : this.defaultDedication.plural;
    }
    if (this.invitation.dedicationMode === 'group') {
      this.subscriptions.push(this.adminService.getGroup(String(this.invitation.group)).subscribe(res => {
        this.dedication = res.invitationDedication;
      }));
    }
    if (this.invitation.dedicationMode === 'customized') {
      this.dedication = this.invitation.dedication;
    }
  }

}
