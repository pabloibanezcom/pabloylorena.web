import { GroupsPage } from './groups.po';
import { browser } from 'protractor';
import { UtilService } from '../../services/util.service';

describe('Groups Page', () => {
    let page: GroupsPage;
    let util: UtilService;

    beforeAll(() => {
        page = new GroupsPage();
        util = new UtilService();
        page.navigateTo();
    });

    it('should display groups header', () => {
        expect(page.getParagraphText()).toEqual('Grupos');
    });

});
