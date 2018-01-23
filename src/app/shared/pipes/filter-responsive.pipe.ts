import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResponsive'
})
export class FilterResponsivePipe implements PipeTransform {

  transform(value: any[], args?: any[]): any {
    const result = value.filter(c => this.checkIfSizeIsHigherOrEquals(args[0], c.responsive) !== args[1] );
    return result;
  }

  private checkIfSizeIsHigherOrEquals(size1: string, string2: string): boolean {
    if (!string2) {
      return false;
    }
    if (size1 === 'lg') {
      return true;
    }
    if (size1 === 'md' && string2 !== 'lg') {
      return true;
    }
    if (size1 === 'sm' && (string2 === 'sm' || string2 === 'xs')) {
      return true;
    }
    if (size1 === 'xs' && string2 === 'xs') {
      return true;
    }
    return false;
  }

}
