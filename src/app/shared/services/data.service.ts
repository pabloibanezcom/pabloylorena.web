import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  get(collection: string): Observable<any> {
    const data = JSON.parse(localStorage.getItem(collection));
    if (data) {
      return this.createObservable(data);
    } else {
      return this.getHttp(collection);
    }
  }

  private getHttp(collection: string): Observable<any> {
    return this.http.get('assets/data/' + collection + '.json')
      .map(res => res.json())
      .do(data => localStorage.setItem(collection, JSON.stringify(data)))
      .catch(this.handleError);
  }

  private createObservable(data: any): Observable<any> {
    return Observable.create(function (observer) {
      observer.next(data);
      observer.complete();
    });
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || '500 internal server error');
  }
}

