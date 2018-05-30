import { RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
    { path: '', loadChildren: './public/public.module#PublicModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
