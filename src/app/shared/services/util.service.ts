import { Injectable } from '@angular/core';

import { Invitation } from '../models/invitation';
import { Guest } from '../models/guest';

declare var jQuery: any;

@Injectable()
export class UtilService {

  constructor() { }

  resolveComplexProperty(obj, property) {
    return property.split('.').reduce(function (prev, curr) {
      return prev ? prev[curr] : null;
    }, obj || self);
  }

  cloneInvitation(originalInv: Invitation): Invitation {
    return originalInv ? JSON.parse(JSON.stringify(originalInv)) : null;
  }

  cloneGuest(originalGuest: Guest): Guest {
    return originalGuest ? JSON.parse(JSON.stringify(originalGuest)) : null;
  }

  showModal(name: string): void {
    jQuery('#' + name).modal('show');
  }

  hideModal(name: string): void {
    jQuery('#' + name).modal('hide');
  }

}
