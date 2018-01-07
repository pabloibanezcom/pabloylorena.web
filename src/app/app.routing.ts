import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: '', loadChildren: 'app/public/public.module#PublicModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
