import { Routes, RouterModule } from '@angular/router';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { InvitationComponent } from './invitation/invitation.component';
import { AuthGuard } from 'ng2-smart-auth';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminBaseComponent,
        canActivate: [AuthGuard],
        data: {
            redirectUrl: '/admin/login'
        }
    },
    {
        path: 'login',
        component: LoginContainerComponent,
        data: { section: 'login' }
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
        path: 'invitation/:invitationId',
        component: InvitationComponent,
        canActivate: [AuthGuard],
        data: {
            redirectUrl: '/admin/login'
        }
    }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
