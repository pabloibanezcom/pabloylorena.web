import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';
import { AttendingLabelComponent } from '../components/attending-label/attending-label.component';
import { CategoryLabelComponent } from '../components/category-label/category-label.component';
import { MoneyLabelComponent } from '../components/money-label/money-label.component';
import { RepliedLabelComponent } from '../components/replied-label/replied-label.component';
import { SentLabelComponent } from '../components/sent-label/sent-label.component';
import { TableGuestsLabelComponent } from '../components/table-guests-label/table-guests-label.component';
import { TableLabelComponent } from '../components/table-label/table-label.component';
import { TotalAmountComponent } from '../components/total-amount/total-amount.component';
import { TypeLabelComponent } from '../components/type-label/type-label.component';

@Injectable()
export class DynamicComponentsService {

  components: any;

  constructor(private factoryResolver: ComponentFactoryResolver) {
    this.components = {
      AttendingLabel: AttendingLabelComponent,
      SentLabel: SentLabelComponent,
      RepliedLabel: RepliedLabelComponent,
      TableLabel: TableLabelComponent,
      TypeLabel: TypeLabelComponent,
      TableGuestsLabel: TableGuestsLabelComponent,
      MoneyLabel: MoneyLabelComponent,
      CategoryLabel: CategoryLabelComponent,
      TotalAmount: TotalAmountComponent
    };
  }

  public generateComponent(viewContainerRef: ViewContainerRef, componentName: string, inputs: any[]) {
    const factory = this.factoryResolver.resolveComponentFactory(this.components[componentName]);
    const newComponent = factory.create(viewContainerRef.parentInjector);
    if (inputs) {
      inputs.forEach(inp => {
        newComponent.instance[inp.name] = inp.value;
      });
    }
    viewContainerRef.insert(newComponent.hostView);
  }
}
