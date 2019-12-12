import { element, by, ElementFinder } from 'protractor';

export class AppUserComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-app-user div table .btn-danger'));
  title = element.all(by.css('jhi-app-user div h2#page-heading span')).first();

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

export class AppUserUpdatePage {
  pageTitle = element(by.id('jhi-app-user-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  firstNameInput = element(by.id('field_firstName'));
  lastNameInput = element(by.id('field_lastName'));
  addressInput = element(by.id('field_address'));
  emailInput = element(by.id('field_email'));
  contactInput = element(by.id('field_contact'));
  appSelect = element(by.id('field_app'));
  organizationSelect = element(by.id('field_organization'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return await this.addressInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setContactInput(contact) {
    await this.contactInput.sendKeys(contact);
  }

  async getContactInput() {
    return await this.contactInput.getAttribute('value');
  }

  async appSelectLastOption() {
    await this.appSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async appSelectOption(option) {
    await this.appSelect.sendKeys(option);
  }

  getAppSelect(): ElementFinder {
    return this.appSelect;
  }

  async getAppSelectedOption() {
    return await this.appSelect.element(by.css('option:checked')).getText();
  }

  async organizationSelectLastOption() {
    await this.organizationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async organizationSelectOption(option) {
    await this.organizationSelect.sendKeys(option);
  }

  getOrganizationSelect(): ElementFinder {
    return this.organizationSelect;
  }

  async getOrganizationSelectedOption() {
    return await this.organizationSelect.element(by.css('option:checked')).getText();
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

export class AppUserDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appUser-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appUser'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
