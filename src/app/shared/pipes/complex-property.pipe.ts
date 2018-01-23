import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../services/util.service';

@Pipe({
  name: 'complexProperty'
})
export class ComplexPropertyPipe implements PipeTransform {

  constructor(
    private util: UtilService
  ) {}

  transform(value: any, args?: any): any {
    return this.util.resolveComplexProperty(value, args);
  }

}
