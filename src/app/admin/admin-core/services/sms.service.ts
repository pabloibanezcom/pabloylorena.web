import { Injectable } from '@angular/core';
import { Notification } from '../../../shared/models/notification';
import { HttpService } from '../../../shared/services/http.service';

@Injectable()
export class SmsService {

  constructor(private http: HttpService) { }

  send(notification: Notification) {
    return this.http.get(`notification/${notification._id}/send`);
  }

}
