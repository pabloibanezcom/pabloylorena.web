import { Injectable } from '@angular/core';

import { Invitation } from '../../shared/models/invitation';
import { Guest } from '../../shared/models/guest';

@Injectable()
export class UtilService {

  constructor() { }

  cloneInvitation(originalInv: Invitation): Invitation {
    return originalInv ? JSON.parse(JSON.stringify(originalInv)) : null;
  }

  cloneGuest(originalGuest: Guest): Guest {
    return originalGuest ? JSON.parse(JSON.stringify(originalGuest)) : null;
  }

}
