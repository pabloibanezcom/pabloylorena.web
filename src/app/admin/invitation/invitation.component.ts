import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InvitationService } from '../../shared/services/invitation.service';
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
    private invitationService: InvitationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.invitationGuid) {
        this.invitationService.getInvitation(params.invitationGuid, true).subscribe(res => {
          this.invitation = res;
          this.url = 'wwww.pabloylorena.com/' + this.invitation.guid;
          console.log(this.invitation);
        });
      }
    });
  }

}
