import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataService } from './services/data.service';
import { GuestService } from './services/guest.service';
import { FormTextComponent } from './form/form-text/form-text.component';
import { FormSpanComponent } from './form/form-span/form-span.component';
import { FormSelectComponent } from './form/form-select/form-select.component';
import { FormGuestComponent } from './form/form-guest/form-guest.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormTextComponent,
    FormSpanComponent,
    FormSelectComponent,
    FormGuestComponent
  ],
  providers: [
    DataService,
    GuestService
  ],
  exports: [
    FormTextComponent,
    FormSpanComponent,
    FormSelectComponent,
    FormGuestComponent
  ]
})
export class SharedModule { }
