import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminService } from '../services/admin.service';
import { Invitation } from '../../shared/models/invitation';


@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.less']
})
export class InvitationComponent implements OnInit {

  invitation: Invitation;
  url: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.invitationId) {
        this.adminService.getInvitation(params.invitationId).subscribe(res => {
          this.invitation = res;
          this.url = 'wwww.pabloylorena.com/' + this.invitation.guid;
        });
      }
    });
  }

  print(): void {
    window.print();
  }

}
