import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { QRCodeModule } from 'angular2-qrcode';
import { AuthGuard, AuthenticationService } from 'ng2-smart-auth';
import { DynamicComponentsService } from 'ng2-smart-common';
import { Ng2SmartFormsModule } from 'ng2-smart-forms';
import { DataService } from '../shared/services/data.service';
import { UtilService } from '../shared/services/util.service';
import { SharedModule } from '../shared/shared.module';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { AdminCoreModule } from './admin-core/admin-core.module';
import { AdminRouting } from './admin.routing';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ModalsModule } from './modals/modals.module';
import { BaseSectionComponent } from './sections/base-section/base-section.component';
import { ExpensesComponent } from './sections/expenses/expenses.component';
import { GroupsComponent } from './sections/groups/groups.component';
import { GuestsComponent } from './sections/guests/guests.component';
import { InvitationsComponent } from './sections/invitations/invitations.component';
import { LoginComponent } from './sections/login/login.component';
import { NotificationsComponent } from './sections/notifications/notifications.component';
import { OverviewComponent } from './sections/overview/overview.component';
import { SectionHeaderComponent } from './sections/section-header/section-header.component';
import { TablePlannerComponent } from './sections/table-planner/table-planner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRouting,
    SharedModule,
    SimpleNotificationsModule,
    QRCodeModule,
    Ng2SmartFormsModule,
    AdminCoreModule.forRoot(),
    ModalsModule
  ],
  declarations: [
    AdminBaseComponent,
    GuestsComponent,
    InvitationsComponent,
    TablePlannerComponent,
    InvitationComponent,
    NotificationsComponent,
    LoginComponent,
    GroupsComponent,
    LoginContainerComponent,
    OverviewComponent,
    ExpensesComponent,
    BaseSectionComponent,
    SectionHeaderComponent,
  ],
  providers: [
    NotificationsService,
    AuthenticationService,
    AuthGuard,
    UtilService,
    DataService,
    DynamicComponentsService
  ]
})
export class AdminModule { }
