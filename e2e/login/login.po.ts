import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/admin/login');
  }

  getParagraphText() {
    return element(by.css('app-root h3 .title-text')).getText();
  }

  getUserInput() {
    return element(by.name('email'));
  }

  getPasswordInput() {
    return element(by.name('password'));
  }

  getSubmitButton() {
    return element(by.css('button[type=submit]'));
  }
}
