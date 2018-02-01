import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminBaseComponent } from './admin-base/admin-base.component';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { QRCodeModule } from 'angular2-qrcode';

import { SharedModule } from '../shared/shared.module';

import { AdminRouting } from './admin.routing';
import { UtilService } from '../shared/services/util.service';
import { DataService } from '../shared/services/data.service';
import { AdminService } from './services/admin.service';
import { NotificationService } from './services/notification.service';
import { GuestsComponent } from './sections/guests/guests.component';
import { GuestModalComponent } from './shared/guest-modal/guest-modal.component';
import { InvitationsComponent } from './sections/invitations/invitations.component';
import { TablePlannerComponent } from './sections/table-planner/table-planner.component';
import { InvitationModalComponent } from './shared/invitation-modal/invitation-modal.component';
import { PersonIconComponent } from './shared/person-icon/person-icon.component';
import { InvitationComponent } from './invitation/invitation.component';
import { NotificationsComponent } from './sections/notifications/notifications.component';
import { LoginComponent } from './sections/login/login.component';
import { GroupsComponent } from './sections/groups/groups.component';
import { GroupModalComponent } from './shared/group-modal/group-modal.component';
import { AuthGuard } from '../shared/auth/authGuard';

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
    InvitationModalComponent,
    PersonIconComponent,
    InvitationComponent,
    NotificationsComponent,
    LoginComponent,
    GroupsComponent,
    GroupModalComponent
  ],
  providers: [
    NotificationsService,
    UtilService,
    DataService,
    AdminService,
    NotificationService,
    AuthGuard
  ]
})
export class AdminModule { }
