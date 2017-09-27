import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', loadChildren: 'app/public/public.module#PublicModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
