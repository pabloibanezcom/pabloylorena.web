import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class HttpService {

  private api_url: string;

  constructor(
    private http: HttpClient
  ) {
    this.api_url = environment.api_url;
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(
      this.api_url + url);
  }

  getWithResponse(url: string): Observable<any> {
    return this.http.get<any>(
      this.api_url + url,
      {
        observe: 'response'
      });
  }

  post(url: string, bodyObj: any): Observable<any> {
    return this.http.post<any>(
      this.api_url + url,
      JSON.stringify(bodyObj),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
  }

  postWithResponse(url: string, bodyObj: any): Observable<any> {
    return this.http.post<any>(
      this.api_url + url,
      JSON.stringify(bodyObj),
      {
        observe: 'response',
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
  }

  put(url: string, bodyObj: any): Observable<any> {
    return this.http.put<any>(
      this.api_url + url,
      JSON.stringify(bodyObj),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
  }

  putWithResponse(url: string, bodyObj: any): Observable<any> {
    return this.http.put<any>(
      this.api_url + url,
      JSON.stringify(bodyObj),
      {
        observe: 'response',
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      });
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(
      this.api_url + url);
  }

  deleteWithResponse(url: string): Observable<any> {
    return this.http.delete<any>(
      this.api_url + url,
      {
        observe: 'response'
      });
  }

}
