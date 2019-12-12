import { element, by, ElementFinder } from 'protractor';

export class OrganizationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-organization div table .btn-danger'));
  title = element.all(by.css('jhi-organization div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getText();
  }
}

export class OrganizationUpdatePage {
  pageTitle = element(by.id('jhi-organization-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  orgNameInput = element(by.id('field_orgName'));
  orgTypeInput = element(by.id('field_orgType'));
  orgAddressInput = element(by.id('field_orgAddress'));
  orgEmailInput = element(by.id('field_orgEmail'));
  dateInput = element(by.id('field_date'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setOrgNameInput(orgName) {
    await this.orgNameInput.sendKeys(orgName);
  }

  async getOrgNameInput() {
    return await this.orgNameInput.getAttribute('value');
  }

  async setOrgTypeInput(orgType) {
    await this.orgTypeInput.sendKeys(orgType);
  }

  async getOrgTypeInput() {
    return await this.orgTypeInput.getAttribute('value');
  }

  async setOrgAddressInput(orgAddress) {
    await this.orgAddressInput.sendKeys(orgAddress);
  }

  async getOrgAddressInput() {
    return await this.orgAddressInput.getAttribute('value');
  }

  async setOrgEmailInput(orgEmail) {
    await this.orgEmailInput.sendKeys(orgEmail);
  }

  async getOrgEmailInput() {
    return await this.orgEmailInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class OrganizationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-organization-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-organization'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
