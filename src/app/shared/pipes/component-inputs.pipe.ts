import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'componentInputs'
})
export class ComponentInputsPipe implements PipeTransform {

  transform(componentInputs: any, element?: any): any[] {
    return componentInputs.map(imp => {
      return { name: imp.name, value: element[imp.property]};
    });
  }

}
