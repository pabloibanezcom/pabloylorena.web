import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

@Injectable()
export class DataService {

  data: any;

  constructor(
    private httpService: HttpService
  ) {
    this.data = {};
  }

  get(name: string) {
    if (!this.data[name]) {
      this.data[name] = this.httpService.post('data', { filter: { name: name }, populate: '' })
        .map(res => res[0])
        .publishReplay(1)
        .refCount();
    }
    return this.data[name];
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create(function (observer) {
      observer.next(data);
      observer.complete();
    });
  }

}

