import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppTypeComponentsPage, AppTypeDeleteDialog, AppTypeUpdatePage } from './app-type.page-object';

const expect = chai.expect;

describe('AppType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appTypeComponentsPage: AppTypeComponentsPage;
  let appTypeUpdatePage: AppTypeUpdatePage;
  let appTypeDeleteDialog: AppTypeDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppTypes', async () => {
    await navBarPage.goToEntity('app-type');
    appTypeComponentsPage = new AppTypeComponentsPage();
    await browser.wait(ec.visibilityOf(appTypeComponentsPage.title), 5000);
    expect(await appTypeComponentsPage.getTitle()).to.eq('App Types');
  });

  it('should load create AppType page', async () => {
    await appTypeComponentsPage.clickOnCreateButton();
    appTypeUpdatePage = new AppTypeUpdatePage();
    expect(await appTypeUpdatePage.getPageTitle()).to.eq('Create or edit a App Type');
    await appTypeUpdatePage.cancel();
  });

  it('should create and save AppTypes', async () => {
    const nbButtonsBeforeCreate = await appTypeComponentsPage.countDeleteButtons();

    await appTypeComponentsPage.clickOnCreateButton();
    await promise.all([appTypeUpdatePage.setTypeInput('type'), appTypeUpdatePage.setNameInput('name')]);
    expect(await appTypeUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
    expect(await appTypeUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    await appTypeUpdatePage.save();
    expect(await appTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AppType', async () => {
    const nbButtonsBeforeDelete = await appTypeComponentsPage.countDeleteButtons();
    await appTypeComponentsPage.clickOnLastDeleteButton();

    appTypeDeleteDialog = new AppTypeDeleteDialog();
    expect(await appTypeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this App Type?');
    await appTypeDeleteDialog.clickOnConfirmButton();

    expect(await appTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
