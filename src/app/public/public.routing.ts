import { Routes, RouterModule } from '@angular/router';
import { PublicBaseComponent } from './public-base/public-base.component';

const publicRoutes: Routes = [
    {
        path: '',
        component: PublicBaseComponent
    },
    {
        path: ':invitationGuid',
        component: PublicBaseComponent
    }
];

export const PublicRouting = RouterModule.forChild(publicRoutes);
