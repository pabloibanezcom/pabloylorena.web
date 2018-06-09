import { Injectable } from '@angular/core';
import { NotificationsService, Options } from 'angular2-notifications';

@Injectable()
export class NotificationService {

  private customOptions = {
    timeOut: 3000,
    showProgressBar: false,
    maxStack: 1
  };

  constructor(
    private notificationsService: NotificationsService
  ) { }

  getOptions(): Options {
    return this.customOptions;
  }

  processHttpResult(
    response: any,
    successTitle: string,
    successContent: string,
    errorTitle?: string,
    errorContent?: string
  ): void {
    if (response.status >= 200 && response.status < 300) {
      this.notificationsService.success(successTitle, successContent);
    } else {
      const title = errorTitle ? errorTitle : 'Error - ' + response.status;
      const content = errorContent ? errorContent : response.statusText;
      this.notificationsService.error(title, content);
    }
  }

  success(title: string, content: string) {
    this.notificationsService.success(title, content, this.customOptions);
  }

  info(title: string, content: string) {
    this.notificationsService.info(title, content, this.customOptions);
  }

  warn(title: string, content: string) {
    this.notificationsService.warn(title, content, this.customOptions);
  }

  error(title: string, content: string) {
    this.notificationsService.error(title, content, this.customOptions);
  }

}
