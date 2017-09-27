import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminBaseComponent } from './admin-base/admin-base.component';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { FacebookService } from 'ngx-facebook';

import { SharedModule } from '../shared/shared.module';
import { HttpService } from '../shared/services/http.service';

import { AdminRouting } from './admin.routing';
import { AuthenticationService } from './services/authentication.service';
import { AdminService } from './services/admin.service';
import { NotificationService } from './services/notification.service';
import { GuestsListComponent } from './sections/guests-list/guests-list.component';
import { GuestModalComponent } from './shared/guest-modal/guest-modal.component';
import { InvitationsComponent } from './sections/invitations/invitations.component';
import { TablePlannerComponent } from './sections/table-planner/table-planner.component';
import { BooleanDotComponent } from './shared/boolean-dot/boolean-dot.component';
import { InvitationModalComponent } from './shared/invitation-modal/invitation-modal.component';
import { AddressPipe } from './pipes/address.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRouting,
    SharedModule,
    SimpleNotificationsModule
  ],
  declarations: [
    AdminBaseComponent,
    GuestModalComponent,
    GuestsListComponent,
    InvitationsComponent,
    TablePlannerComponent,
    BooleanDotComponent,
    InvitationModalComponent,
    AddressPipe
  ],
  providers: [
    FacebookService,
    NotificationsService,
    AuthenticationService,
    AdminService,
    NotificationService,
    HttpService
  ]
})
export class AdminModule { }
