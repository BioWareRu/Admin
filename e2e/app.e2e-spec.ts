import { BwadminPage } from './app.po';

describe('bwadmin App', () => {
  let page: BwadminPage;

  beforeEach(() => {
    page = new BwadminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
