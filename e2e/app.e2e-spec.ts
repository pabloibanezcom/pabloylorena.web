import { PabloylorenaPage } from './app.po';

describe('pabloylorena App', () => {
  let page: PabloylorenaPage;

  beforeEach(() => {
    page = new PabloylorenaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
