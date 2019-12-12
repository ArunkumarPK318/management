import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { OrganizationComponentsPage, OrganizationDeleteDialog, OrganizationUpdatePage } from './organization.page-object';

const expect = chai.expect;

describe('Organization e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let organizationComponentsPage: OrganizationComponentsPage;
  let organizationUpdatePage: OrganizationUpdatePage;
  let organizationDeleteDialog: OrganizationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Organizations', async () => {
    await navBarPage.goToEntity('organization');
    organizationComponentsPage = new OrganizationComponentsPage();
    await browser.wait(ec.visibilityOf(organizationComponentsPage.title), 5000);
    expect(await organizationComponentsPage.getTitle()).to.eq('Organizations');
  });

  it('should load create Organization page', async () => {
    await organizationComponentsPage.clickOnCreateButton();
    organizationUpdatePage = new OrganizationUpdatePage();
    expect(await organizationUpdatePage.getPageTitle()).to.eq('Create or edit a Organization');
    await organizationUpdatePage.cancel();
  });

  it('should create and save Organizations', async () => {
    const nbButtonsBeforeCreate = await organizationComponentsPage.countDeleteButtons();

    await organizationComponentsPage.clickOnCreateButton();
    await promise.all([
      organizationUpdatePage.setOrgNameInput('orgName'),
      organizationUpdatePage.setOrgTypeInput('orgType'),
      organizationUpdatePage.setOrgAddressInput('orgAddress'),
      organizationUpdatePage.setOrgEmailInput('orgEmail'),
      organizationUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await organizationUpdatePage.getOrgNameInput()).to.eq('orgName', 'Expected OrgName value to be equals to orgName');
    expect(await organizationUpdatePage.getOrgTypeInput()).to.eq('orgType', 'Expected OrgType value to be equals to orgType');
    expect(await organizationUpdatePage.getOrgAddressInput()).to.eq('orgAddress', 'Expected OrgAddress value to be equals to orgAddress');
    expect(await organizationUpdatePage.getOrgEmailInput()).to.eq('orgEmail', 'Expected OrgEmail value to be equals to orgEmail');
    expect(await organizationUpdatePage.getDateInput()).to.contain('2001-01-01T02:30', 'Expected date value to be equals to 2000-12-31');
    await organizationUpdatePage.save();
    expect(await organizationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await organizationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Organization', async () => {
    const nbButtonsBeforeDelete = await organizationComponentsPage.countDeleteButtons();
    await organizationComponentsPage.clickOnLastDeleteButton();

    organizationDeleteDialog = new OrganizationDeleteDialog();
    expect(await organizationDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Organization?');
    await organizationDeleteDialog.clickOnConfirmButton();

    expect(await organizationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
