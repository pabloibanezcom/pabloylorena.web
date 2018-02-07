import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResponsive'
})
export class FilterResponsivePipe implements PipeTransform {

  transform(value: any[], args?: any[]): any {
    const result = value.filter(c => this.checkIfSizeIsHigherOrEquals(args[0], c.responsive) !== args[1] );
    return result;
  }

  private checkIfSizeIsHigherOrEquals(size1: string, size2: string): boolean {
    if (!size2) {
      return false;
    }
    if (size1 === 'lg') {
      return true;
    }
    if (size1 === 'md' && size2 !== 'lg') {
      return true;
    }
    if (size1 === 'sm' && (size2 === 'sm' || size2 === 'xs')) {
      return true;
    }
    if (size1 === 'xs' && size2 === 'xs') {
      return true;
    }
    return false;
  }

}
