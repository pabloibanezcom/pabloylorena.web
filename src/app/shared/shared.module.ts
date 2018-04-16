import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicComponentsService } from './services/dynamic-components.service';
import { UtilService } from './services/util.service';
import { ResponsiveService } from './services/responsive.service';
import { DataService } from './services/data.service';
import { GuestService } from './services/guest.service';

import { FooterComponent } from './components/footer/footer.component';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';
import { ComplexPropertyPipe } from './pipes/complex-property.pipe';
import { FilterResponsivePipe } from './pipes/filter-responsive.pipe';
import { ResponsiveTablePaginationComponent } from './responsive-table/responsive-table-pagination/responsive-table-pagination.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AttendingLabelComponent } from './components/attending-label/attending-label.component';
import { TableLabelComponent } from './components/table-label/table-label.component';
import { InjectComponentDirective } from './directives/inject-component.directive';
import { ComponentInputsPipe } from './pipes/component-inputs.pipe';
import { TypeLabelComponent } from './components/type-label/type-label.component';
import { SentLabelComponent } from './components/sent-label/sent-label.component';
import { RepliedLabelComponent } from './components/replied-label/replied-label.component';
import { AdjustHeightDirective } from './directives/adjust-height.directive';
import { TableGuestsLabelComponent } from './components/table-guests-label/table-guests-label.component';
import { MoneyLabelComponent } from './components/money-label/money-label.component';

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
    ResponsiveTableComponent,
    ComplexPropertyPipe,
    FilterResponsivePipe,
    ResponsiveTablePaginationComponent,
    AttendingLabelComponent,
    InjectComponentDirective,
    ComponentInputsPipe,
    TableLabelComponent,
    TypeLabelComponent,
    SentLabelComponent,
    RepliedLabelComponent,
    AdjustHeightDirective,
    TableGuestsLabelComponent,
    MoneyLabelComponent
  ],
  providers: [
    DynamicComponentsService,
    UtilService,
    ResponsiveService,
    DataService,
    GuestService
  ],
  exports: [
    LoadingSpinnerComponent,
    FooterComponent,
    ResponsiveTableComponent,
    ComplexPropertyPipe,
    FilterResponsivePipe,
    AttendingLabelComponent,
    AdjustHeightDirective
  ],
  entryComponents: [
    AttendingLabelComponent,
    SentLabelComponent,
    RepliedLabelComponent,
    TableLabelComponent,
    TypeLabelComponent,
    TableGuestsLabelComponent,
    MoneyLabelComponent
  ],
})
export class SharedModule { }
