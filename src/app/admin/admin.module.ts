import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminBaseComponent } from './admin-base/admin-base.component';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { QRCodeModule } from 'angular2-qrcode';
import { AuthenticationService, AuthGuard } from 'ng2-smart-auth';
import { Ng2SmartFormsModule } from 'ng2-smart-forms';
import { DynamicComponentsService } from 'ng2-smart-common';

import { SharedModule } from '../shared/shared.module';

import { AdminRouting } from './admin.routing';
import { UtilService } from '../shared/services/util.service';
import { DataService } from '../shared/services/data.service';
import { AdminService } from './services/admin.service';
import { NotificationService } from './services/notification.service';
import { GuestsComponent } from './sections/guests/guests.component';
import { GuestModalComponent } from './modals/guest-modal/guest-modal.component';
import { InvitationsComponent } from './sections/invitations/invitations.component';
import { TablePlannerComponent } from './sections/table-planner/table-planner.component';
import { InvitationModalComponent } from './modals/invitation-modal/invitation-modal.component';
import { InvitationComponent } from './invitation/invitation.component';
import { NotificationsComponent } from './sections/notifications/notifications.component';
import { LoginComponent } from './sections/login/login.component';
import { GroupsComponent } from './sections/groups/groups.component';
import { GroupModalComponent } from './modals/group-modal/group-modal.component';
import { OverviewComponent } from './sections/overview/overview.component';
import { LoginContainerComponent } from './login-container/login-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouting,
    SharedModule,
    SimpleNotificationsModule,
    QRCodeModule,
    Ng2SmartFormsModule
  ],
  declarations: [
    AdminBaseComponent,
    GuestModalComponent,
    GuestsComponent,
    InvitationsComponent,
    TablePlannerComponent,
    InvitationModalComponent,
    InvitationComponent,
    NotificationsComponent,
    LoginComponent,
    GroupsComponent,
    GroupModalComponent,
    OverviewComponent,
    LoginContainerComponent
  ],
  providers: [
    NotificationsService,
    AuthenticationService,
    AuthGuard,
    UtilService,
    DataService,
    AdminService,
    NotificationService,
    DynamicComponentsService
  ]
})
export class AdminModule { }
