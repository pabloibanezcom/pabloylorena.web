import { Routes, RouterModule } from '@angular/router';
import { AdminBaseComponent } from './admin-base/admin-base.component';

const adminRoutes: Routes = [
    {
        path: '',
        component: AdminBaseComponent
    }
];

export const AdminRouting = RouterModule.forChild(adminRoutes);
