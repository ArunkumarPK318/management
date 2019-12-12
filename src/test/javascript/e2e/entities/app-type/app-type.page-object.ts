import { element, by, ElementFinder } from 'protractor';

export class AppTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-app-type div table .btn-danger'));
  title = element.all(by.css('jhi-app-type div h2#page-heading span')).first();

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

export class AppTypeUpdatePage {
  pageTitle = element(by.id('jhi-app-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  typeInput = element(by.id('field_type'));
  nameInput = element(by.id('field_name'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return await this.typeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
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

export class AppTypeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-appType-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-appType'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
