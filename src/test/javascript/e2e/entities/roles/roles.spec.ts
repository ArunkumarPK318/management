import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RolesComponentsPage, RolesDeleteDialog, RolesUpdatePage } from './roles.page-object';

const expect = chai.expect;

describe('Roles e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rolesComponentsPage: RolesComponentsPage;
  let rolesUpdatePage: RolesUpdatePage;
  let rolesDeleteDialog: RolesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Roles', async () => {
    await navBarPage.goToEntity('roles');
    rolesComponentsPage = new RolesComponentsPage();
    await browser.wait(ec.visibilityOf(rolesComponentsPage.title), 5000);
    expect(await rolesComponentsPage.getTitle()).to.eq('Roles');
  });

  it('should load create Roles page', async () => {
    await rolesComponentsPage.clickOnCreateButton();
    rolesUpdatePage = new RolesUpdatePage();
    expect(await rolesUpdatePage.getPageTitle()).to.eq('Create or edit a Roles');
    await rolesUpdatePage.cancel();
  });

  it('should create and save Roles', async () => {
    const nbButtonsBeforeCreate = await rolesComponentsPage.countDeleteButtons();

    await rolesComponentsPage.clickOnCreateButton();
    await promise.all([
      rolesUpdatePage.setRoleTypeInput('roleType'),
      rolesUpdatePage.setRoleInput('role'),
      rolesUpdatePage.setCodeInput('code'),
      rolesUpdatePage.rolesSelectLastOption(),
      rolesUpdatePage.appSelectLastOption(),
      rolesUpdatePage.appuserSelectLastOption()
    ]);
    expect(await rolesUpdatePage.getRoleTypeInput()).to.eq('roleType', 'Expected RoleType value to be equals to roleType');
    expect(await rolesUpdatePage.getRoleInput()).to.eq('role', 'Expected Role value to be equals to role');
    expect(await rolesUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    await rolesUpdatePage.save();
    expect(await rolesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Roles', async () => {
    const nbButtonsBeforeDelete = await rolesComponentsPage.countDeleteButtons();
    await rolesComponentsPage.clickOnLastDeleteButton();

    rolesDeleteDialog = new RolesDeleteDialog();
    expect(await rolesDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Roles?');
    await rolesDeleteDialog.clickOnConfirmButton();

    expect(await rolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
