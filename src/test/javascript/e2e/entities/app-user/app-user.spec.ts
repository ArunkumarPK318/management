import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AppUserComponentsPage, AppUserDeleteDialog, AppUserUpdatePage } from './app-user.page-object';

const expect = chai.expect;

describe('AppUser e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let appUserComponentsPage: AppUserComponentsPage;
  let appUserUpdatePage: AppUserUpdatePage;
  let appUserDeleteDialog: AppUserDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AppUsers', async () => {
    await navBarPage.goToEntity('app-user');
    appUserComponentsPage = new AppUserComponentsPage();
    await browser.wait(ec.visibilityOf(appUserComponentsPage.title), 5000);
    expect(await appUserComponentsPage.getTitle()).to.eq('App Users');
  });

  it('should load create AppUser page', async () => {
    await appUserComponentsPage.clickOnCreateButton();
    appUserUpdatePage = new AppUserUpdatePage();
    expect(await appUserUpdatePage.getPageTitle()).to.eq('Create or edit a App User');
    await appUserUpdatePage.cancel();
  });

  it('should create and save AppUsers', async () => {
    const nbButtonsBeforeCreate = await appUserComponentsPage.countDeleteButtons();

    await appUserComponentsPage.clickOnCreateButton();
    await promise.all([
      appUserUpdatePage.setFirstNameInput('firstName'),
      appUserUpdatePage.setLastNameInput('lastName'),
      appUserUpdatePage.setAddressInput('address'),
      appUserUpdatePage.setEmailInput('email'),
      appUserUpdatePage.setContactInput('contact'),
      appUserUpdatePage.appSelectLastOption(),
      appUserUpdatePage.organizationSelectLastOption()
    ]);
    expect(await appUserUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await appUserUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await appUserUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await appUserUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await appUserUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');
    await appUserUpdatePage.save();
    expect(await appUserUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await appUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AppUser', async () => {
    const nbButtonsBeforeDelete = await appUserComponentsPage.countDeleteButtons();
    await appUserComponentsPage.clickOnLastDeleteButton();

    appUserDeleteDialog = new AppUserDeleteDialog();
    expect(await appUserDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this App User?');
    await appUserDeleteDialog.clickOnConfirmButton();

    expect(await appUserComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
