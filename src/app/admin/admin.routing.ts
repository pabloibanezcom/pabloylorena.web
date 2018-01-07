import { Routes, RouterModule } from '@angular/router';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { InvitationComponent } from './invitation/invitation.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminBaseComponent
    },
    {
        path: 'invitation/:invitationGuid',
        component: InvitationComponent
    }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
