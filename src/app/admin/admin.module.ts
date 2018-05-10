import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminBaseComponent } from './admin-base/admin-base.component';

import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { QRCodeModule } from 'angular2-qrcode';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { ChartsModule } from 'ng2-charts';
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
import { LoginContainerComponent } from './login-container/login-container.component';
import { OverviewComponent } from './sections/overview/overview.component';
import { TableModalComponent } from './modals/table-modal/table-modal.component';
import { GuestTableModalComponent } from './modals/guest-table-modal/guest-table-modal.component';
import { ExpensesComponent } from './sections/expenses/expenses.component';
import { ExpenseModalComponent } from './modals/expense-modal/expense-modal.component';
import { BaseModalComponent } from './modals/base-modal/base-modal.component';
import { BaseSectionComponent } from './sections/base-section/base-section.component';
import { SectionHeaderComponent } from './sections/section-header/section-header.component';
import { DeleteModeComponent } from './modals/delete-mode/delete-mode.component';
// import { OverviewPanelComponent } from './sections/overview/overview-panel/overview-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouting,
    SharedModule,
    SimpleNotificationsModule,
    QRCodeModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    // ChartsModule,
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
    LoginContainerComponent,
    OverviewComponent,
    TableModalComponent,
    GuestTableModalComponent,
    ExpensesComponent,
    ExpenseModalComponent,
    BaseModalComponent,
    BaseSectionComponent,
    SectionHeaderComponent,
    DeleteModeComponent
    // OverviewPanelComponent
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
