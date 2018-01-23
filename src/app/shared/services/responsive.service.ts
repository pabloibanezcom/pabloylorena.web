import { Injectable } from '@angular/core';

@Injectable()
export class ResponsiveService {

  constructor() {
  }

  getSizeCode(windowSize: number): string {
    if (windowSize >= 1200) {
      return 'lg';
    }
    if (windowSize >= 992) {
      return 'md';
    }
    if (windowSize >= 768) {
      return 'sm';
    }
    return 'xs';
  }

}
