import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AdminService, NotificationService } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AdminService,
    NotificationService
  ]
})
export class AdminCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminCoreModule,
      providers: [
        AdminService,
        NotificationService
      ]
    };
  }
}
