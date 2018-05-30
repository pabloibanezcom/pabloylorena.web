import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Ng2SmartFormsModule } from 'ng2-smart-forms';
import { SharedModule } from '../../shared/shared.module';
import { AdminCoreModule } from '../admin-core/admin-core.module';
import { BaseModalComponent, DeleteModeComponent, ExpenseModalComponent, GroupModalComponent, GuestModalComponent, InvitationModalComponent, NotificationModalComponent, TableGuestModalComponent, TableModalComponent } from './';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        Ng2SmartFormsModule,
        AdminCoreModule
    ],
    declarations: [
        BaseModalComponent,
        DeleteModeComponent,
        ConfirmModalComponent,
        ExpenseModalComponent,
        GroupModalComponent,
        GuestModalComponent,
        TableGuestModalComponent,
        InvitationModalComponent,
        TableModalComponent,
        NotificationModalComponent
    ],
    exports: [
        ConfirmModalComponent,
        ExpenseModalComponent,
        GroupModalComponent,
        GuestModalComponent,
        TableGuestModalComponent,
        InvitationModalComponent,
        TableModalComponent,
        NotificationModalComponent
    ]
})
export class ModalsModule {
}
