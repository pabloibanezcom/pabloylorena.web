import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as moment from 'moment';

import { Invitation } from '../../shared/models/invitation';

@Injectable()
export class AnalyticsService {

  constructor(private angulartics2: Angulartics2) {}

  trackEvent(category: string, action: string) {
    this.angulartics2.eventTrack.next({ 
      action: action, 
      properties: { 
        category: category,
        label: moment().format('DD-MM-YYYY - HH:mm:ss')
       },
    });
  }

  trackStart(invitation: Invitation) {
    this.trackEvent(this.getDescriptionFromInvitation(invitation), 'Start');
  }

  trackAttendanceOpened(invitation: Invitation) {
    this.trackEvent(this.getDescriptionFromInvitation(invitation), 'Attendance opened');
  }

  private getDescriptionFromInvitation(invitation: Invitation) {
    return invitation.alias + ' (' + invitation.guid + ')';
  }

}
