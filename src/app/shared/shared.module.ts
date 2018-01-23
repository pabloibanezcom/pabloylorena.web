import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UtilService } from './services/util.service';
import { ResponsiveService } from './services/responsive.service';
import { DataService } from './services/data.service';
import { GuestService } from './services/guest.service';
import { ResponsiveTableService } from './responsive-table/responsive-table.service';

import { FormTextComponent } from './form/form-text/form-text.component';
import { FormSpanComponent } from './form/form-span/form-span.component';
import { FormSelectComponent } from './form/form-select/form-select.component';
import { FormGuestComponent } from './form/form-guest/form-guest.component';
import { FormButtonComponent } from './form/form-button/form-button.component';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';
import { ComplexPropertyPipe } from './pipes/complex-property.pipe';
import { AttendingLabelComponent } from './components/attending-label/attending-label.component';
import { FilterResponsivePipe } from './pipes/filter-responsive.pipe';
import { FilterCollectionPipe } from './pipes/filter-collection.pipe';
import { ResponsiveTablePaginationComponent } from './responsive-table/responsive-table-pagination/responsive-table-pagination.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    FormTextComponent,
    FormSpanComponent,
    FormSelectComponent,
    FormGuestComponent,
    FormButtonComponent,
    ResponsiveTableComponent,
    ComplexPropertyPipe,
    AttendingLabelComponent,
    FilterResponsivePipe,
    FilterCollectionPipe,
    ResponsiveTablePaginationComponent
  ],
  providers: [
    UtilService,
    ResponsiveService,
    DataService,
    GuestService,
    ResponsiveTableService
  ],
  exports: [
    LoadingSpinnerComponent,
    FormTextComponent,
    FormSpanComponent,
    FormSelectComponent,
    FormGuestComponent,
    FormButtonComponent,
    ResponsiveTableComponent,
    ComplexPropertyPipe,
    FilterResponsivePipe,
    FilterCollectionPipe,
    AttendingLabelComponent
  ]
})
export class SharedModule { }
