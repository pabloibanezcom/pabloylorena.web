import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminBaseComponent } from './admin-base/admin-base.component';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { QRCodeModule } from 'angular2-qrcode';

import { SharedModule } from '../shared/shared.module';

import { AdminRouting } from './admin.routing';
import { UtilService } from '../shared/services/util.service';
import { AdminService } from './services/admin.service';
import { NotificationService } from './services/notification.service';
import { GuestsComponent } from './sections/guests/guests.component';
import { GuestModalComponent } from './shared/guest-modal/guest-modal.component';
import { InvitationsComponent } from './sections/invitations/invitations.component';
import { TablePlannerComponent } from './sections/table-planner/table-planner.component';
import { BooleanDotComponent } from './shared/boolean-dot/boolean-dot.component';
import { InvitationModalComponent } from './shared/invitation-modal/invitation-modal.component';
import { AddressPipe } from './pipes/address.pipe';
import { PersonIconComponent } from './shared/person-icon/person-icon.component';
import { InvitationComponent } from './invitation/invitation.component';
import { NotificationsComponent } from './sections/notifications/notifications.component';
import { LoginComponent } from './sections/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouting,
    SharedModule,
    SimpleNotificationsModule,
    QRCodeModule
  ],
  declarations: [
    AdminBaseComponent,
    GuestModalComponent,
    GuestsComponent,
    InvitationsComponent,
    TablePlannerComponent,
    BooleanDotComponent,
    InvitationModalComponent,
    AddressPipe,
    PersonIconComponent,
    InvitationComponent,
    NotificationsComponent,
    LoginComponent
  ],
  providers: [
    NotificationsService,
    UtilService,
    AdminService,
    NotificationService
  ]
})
export class AdminModule { }
