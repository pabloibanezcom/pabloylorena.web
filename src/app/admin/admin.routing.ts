import { Routes, RouterModule } from '@angular/router';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { InvitationComponent } from './invitation/invitation.component';
import { AuthGuard } from 'ng2-smart-auth';

const adminRoutes: Routes = [
    {
        path: 'login',
        component: AdminBaseComponent
    },
    {
        path: ':section',
        component: AdminBaseComponent,
        canActivate: [AuthGuard],
        data: {
            redirectUrl: '/admin/login'
        }
    },
    {
        path: 'invitation/:invitationGuid',
        component: InvitationComponent,
        canActivate: [AuthGuard],
        data: {
            redirectUrl: '/admin/login'
        }
    }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
