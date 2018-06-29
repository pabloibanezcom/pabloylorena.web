import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'ng2-smart-auth';
import { AdminBaseComponent } from './admin-base/admin-base.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { StreetTableComponent } from './street-table/street-table.component';

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
    },
    {
        path: 'table/street/:tableId',
        component: StreetTableComponent,
        canActivate: [AuthGuard],
        data: {
            redirectUrl: '/admin/login'
        }
    },
    {
        path: 'guests/list',
        component: GuestListComponent,
        canActivate: [AuthGuard],
        data: {
            redirectUrl: '/admin/login'
        }
    }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
