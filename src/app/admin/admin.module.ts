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
import { SmsService } from './admin-core/services/sms.service';
import { AdminRouting } from './admin.routing';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ModalsModule } from './modals/modals.module';
import { BaseSectionComponent, ExpensesComponent, GroupsComponent, GuestsComponent, InvitationsComponent, LoginComponent, NotificationsComponent, OverviewComponent, SectionHeaderComponent, TablePlannerComponent } from './sections';
import { TableGuestsComponent } from './sections/table-planner/table-guests/table-guests.component';
import { TablesComponent } from './sections/table-planner/tables/tables.component';

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
    TablesComponent,
    TableGuestsComponent,
  ],
  providers: [
    NotificationsService,
    AuthenticationService,
    SmsService,
    AuthGuard,
    UtilService,
    DataService,
    DynamicComponentsService
  ]
})
export class AdminModule { }
