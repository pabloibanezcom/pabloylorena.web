import { Pipe, PipeTransform } from '@angular/core';

import { Address } from '../../shared/models/address';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: Address, args?: any): any {
    if (!value) { return null; }
    let result = value.line1;
    result = value.line2 ? result + ', ' + value.line2 : result;
    result = value.line3 ? result + ', ' + value.line3 : result;
    return result + ', ' + value.postalCode + ', ' + value.town + ', ' + value.country;
  }

}
