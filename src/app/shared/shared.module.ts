import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GuestService } from './services/guest.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    GuestService
  ]
})
export class SharedModule { }
