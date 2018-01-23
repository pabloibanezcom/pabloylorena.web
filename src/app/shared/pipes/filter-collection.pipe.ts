import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCollection'
})
export class FilterCollectionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args.searchStr || args.searchStr.length < 3) {
      return value;
    }
    return value.filter(e => e[args.property].toLowerCase().includes(args.searchStr.toLowerCase()));
  }

}
