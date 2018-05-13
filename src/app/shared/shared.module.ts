import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AttendingLabelComponent } from './components/attending-label/attending-label.component';
import { BaseComponent } from './components/base-component/base.component';
import { CategoryLabelComponent } from './components/category-label/category-label.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoneyLabelComponent } from './components/money-label/money-label.component';
import { RepliedLabelComponent } from './components/replied-label/replied-label.component';
import { SentLabelComponent } from './components/sent-label/sent-label.component';
import { TableGuestsLabelComponent } from './components/table-guests-label/table-guests-label.component';
import { TableLabelComponent } from './components/table-label/table-label.component';
import { TotalAmountComponent } from './components/total-amount/total-amount.component';
import { TypeLabelComponent } from './components/type-label/type-label.component';
import { AdjustHeightDirective } from './directives/adjust-height.directive';
import { InjectComponentDirective } from './directives/inject-component.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ComplexPropertyPipe } from './pipes/complex-property.pipe';
import { ComponentInputsPipe } from './pipes/component-inputs.pipe';
import { FilterResponsivePipe } from './pipes/filter-responsive.pipe';
import { ResponsiveTablePaginationComponent } from './responsive-table/responsive-table-pagination/responsive-table-pagination.component';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';
import { DataService } from './services/data.service';
import { DynamicComponentsService } from './services/dynamic-components.service';
import { GuestService } from './services/guest.service';
import { ResponsiveService } from './services/responsive.service';
import { UtilService } from './services/util.service';

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
    MoneyLabelComponent,
    BaseComponent,
    CategoryLabelComponent,
    TotalAmountComponent
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
    AdjustHeightDirective,
    BaseComponent
  ],
  entryComponents: [
    AttendingLabelComponent,
    SentLabelComponent,
    RepliedLabelComponent,
    TableLabelComponent,
    TypeLabelComponent,
    TableGuestsLabelComponent,
    MoneyLabelComponent,
    CategoryLabelComponent,
    TotalAmountComponent
  ],
})
export class SharedModule { }
