import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicComponentsService } from './services/dynamic-components.service';
import { UtilService } from './services/util.service';
import { ResponsiveService } from './services/responsive.service';
import { DataService } from './services/data.service';
import { GuestService } from './services/guest.service';
import { ResponsiveTableService } from './responsive-table/responsive-table.service';

import { FooterComponent } from './components/footer/footer.component';
import { FormTextComponent } from './form/form-text/form-text.component';
import { FormSpanComponent } from './form/form-span/form-span.component';
import { FormSelectComponent } from './form/form-select/form-select.component';
import { FormGuestComponent } from './form/form-guest/form-guest.component';
import { FormButtonComponent } from './form/form-button/form-button.component';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';
import { ComplexPropertyPipe } from './pipes/complex-property.pipe';
import { FilterResponsivePipe } from './pipes/filter-responsive.pipe';
import { FilterCollectionPipe } from './pipes/filter-collection.pipe';
import { ResponsiveTablePaginationComponent } from './responsive-table/responsive-table-pagination/responsive-table-pagination.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AttendingLabelComponent } from './components/attending-label/attending-label.component';
import { TableLabelComponent } from './components/table-label/table-label.component';
import { InjectComponentDirective } from './directives/inject-component.directive';
import { ComponentInputsPipe } from './pipes/component-inputs.pipe';
import { TypeLabelComponent } from './components/type-label/type-label.component';
import { SentLabelComponent } from './components/sent-label/sent-label.component';
import { RepliedLabelComponent } from './components/replied-label/replied-label.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    FooterComponent,
    FormTextComponent,
    FormSpanComponent,
    FormSelectComponent,
    FormGuestComponent,
    FormButtonComponent,
    ResponsiveTableComponent,
    ComplexPropertyPipe,
    FilterResponsivePipe,
    FilterCollectionPipe,
    ResponsiveTablePaginationComponent,
    AttendingLabelComponent,
    InjectComponentDirective,
    ComponentInputsPipe,
    TableLabelComponent,
    TypeLabelComponent,
    SentLabelComponent,
    RepliedLabelComponent
  ],
  providers: [
    DynamicComponentsService,
    UtilService,
    ResponsiveService,
    DataService,
    GuestService,
    ResponsiveTableService
  ],
  exports: [
    LoadingSpinnerComponent,
    FooterComponent,
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
  ],
  entryComponents: [
    AttendingLabelComponent,
    SentLabelComponent,
    RepliedLabelComponent,
    TableLabelComponent,
    TypeLabelComponent
  ],
})
export class SharedModule { }
