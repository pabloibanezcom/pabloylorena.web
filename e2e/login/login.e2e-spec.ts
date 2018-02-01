import { LoginPage } from './login.po';
import { browser } from 'protractor';
import { UtilService } from '../services/util.service';

describe('Login Page', () => {
    let page: LoginPage;
    let util: UtilService;

    beforeAll(() => {
        page = new LoginPage();
        util = new UtilService();
        page.navigateTo();
    });

    beforeEach(() => {
        page.getUserInput().clear();
        page.getPasswordInput().clear();
    });

    it('should display login header', () => {
        expect(page.getParagraphText()).toEqual('Login');
    });

    it('should not login when wrong credentials and stay in login view', () => {
        page.getUserInput().sendKeys(util.getAdminCredentials().user);
        page.getPasswordInput().sendKeys('WrongPassword');
        page.getSubmitButton().click();
        expect(browser.getCurrentUrl()).toEqual(util.getPath('login'));
    });

    it('should login when right credentials and move to the right view', () => {
        page.getUserInput().sendKeys(util.getAdminCredentials().user);
        page.getPasswordInput().sendKeys(util.getAdminCredentials().password);
        page.getSubmitButton().click();
        expect(browser.getCurrentUrl()).toEqual(util.getPath('invitations'));
    });
});
