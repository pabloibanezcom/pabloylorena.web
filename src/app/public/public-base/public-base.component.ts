import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TemplateService } from '../shared/services/template.service';
import { InvitationService } from '../../shared/services/invitation.service';
import { Invitation } from '../../shared/models/invitation';

@Component({
  selector: 'app-public-base',
  templateUrl: './public-base.component.html',
  styleUrls: ['./public-base.component.less']
})
export class PublicBaseComponent implements OnInit {

  public editMode: boolean;
  public invitation: Invitation;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private invitationService: InvitationService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params.invitationGuid);
      if (params.invitationGuid) {
        this.invitationService.getInvitation(params.invitationGuid, false).subscribe(res => {
          this.invitation = res;
          this.editMode = true;
          console.log(this.invitation);
        });
      } else {
        this.invitation = new Invitation();
        this.invitation.guests = [];
      }
    });
    this.templateService.init();
  }

}
