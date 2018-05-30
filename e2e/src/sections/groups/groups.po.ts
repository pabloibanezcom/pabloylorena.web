import { browser, by, element } from 'protractor';

export class GroupsPage {

  navigateTo() {
    return browser.get('/admin/groups');
  }

  getParagraphText() {
    return element(by.css('app-root h3 .title-text')).getText();
  }

}
