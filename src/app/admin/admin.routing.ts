import { Routes, RouterModule } from '@angular/router';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { InvitationComponent } from './invitation/invitation.component';
import { AuthGuard } from '../shared/auth/authGuard';

const adminRoutes: Routes = [
    {
        path: 'login',
        component: AdminBaseComponent
    },
    {
        path: ':section',
        component: AdminBaseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'invitation/:invitationGuid',
        component: InvitationComponent,
        canActivate: [AuthGuard]
    }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
