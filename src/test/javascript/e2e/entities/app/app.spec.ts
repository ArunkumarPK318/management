import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppComponentsPage, AppDeleteDialog, AppUpdatePage } from './app.page-object';

const expect = chai.expect;

describe('App e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appComponentsPage: AppComponentsPage;
  let appUpdatePage: AppUpdatePage;
  let appDeleteDialog: AppDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Apps', async () => {
    await navBarPage.goToEntity('app');
    appComponentsPage = new AppComponentsPage();
    await browser.wait(ec.visibilityOf(appComponentsPage.title), 5000);
    expect(await appComponentsPage.getTitle()).to.eq('Apps');
  });

  it('should load create App page', async () => {
    await appComponentsPage.clickOnCreateButton();
    appUpdatePage = new AppUpdatePage();
    expect(await appUpdatePage.getPageTitle()).to.eq('Create or edit a App');
    await appUpdatePage.cancel();
  });

  it('should create and save Apps', async () => {
    const nbButtonsBeforeCreate = await appComponentsPage.countDeleteButtons();

    await appComponentsPage.clickOnCreateButton();
    await promise.all([
      appUpdatePage.setNameInput('name'),
      appUpdatePage.setVersionInput('version'),
      appUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      appUpdatePage.setUrlPathInput('urlPath'),
      appUpdatePage.appTypeSelectLastOption()
    ]);
    expect(await appUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await appUpdatePage.getVersionInput()).to.eq('version', 'Expected Version value to be equals to version');
    expect(await appUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    expect(await appUpdatePage.getUrlPathInput()).to.eq('urlPath', 'Expected UrlPath value to be equals to urlPath');
    await appUpdatePage.save();
    expect(await appUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last App', async () => {
    const nbButtonsBeforeDelete = await appComponentsPage.countDeleteButtons();
    await appComponentsPage.clickOnLastDeleteButton();

    appDeleteDialog = new AppDeleteDialog();
    expect(await appDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this App?');
    await appDeleteDialog.clickOnConfirmButton();

    expect(await appComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
