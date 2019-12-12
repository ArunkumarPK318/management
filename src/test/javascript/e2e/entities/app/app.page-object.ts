import { element, by, ElementFinder } from 'protractor';

export class AppComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-app div table .btn-danger'));
  title = element.all(by.css('jhi-app div h2#page-heading span')).first();

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

export class AppUpdatePage {
  pageTitle = element(by.id('jhi-app-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  nameInput = element(by.id('field_name'));
  versionInput = element(by.id('field_version'));
  dateInput = element(by.id('field_date'));
  urlPathInput = element(by.id('field_urlPath'));
  appTypeSelect = element(by.id('field_appType'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setVersionInput(version) {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput() {
    return await this.versionInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
  }

  async setUrlPathInput(urlPath) {
    await this.urlPathInput.sendKeys(urlPath);
  }

  async getUrlPathInput() {
    return await this.urlPathInput.getAttribute('value');
  }

  async appTypeSelectLastOption() {
    await this.appTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async appTypeSelectOption(option) {
    await this.appTypeSelect.sendKeys(option);
  }

  getAppTypeSelect(): ElementFinder {
    return this.appTypeSelect;
  }

  async getAppTypeSelectedOption() {
    return await this.appTypeSelect.element(by.css('option:checked')).getText();
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

export class AppDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-app-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-app'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
