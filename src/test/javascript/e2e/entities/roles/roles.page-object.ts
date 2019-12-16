import { element, by, ElementFinder } from 'protractor';

export class RolesComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-roles div table .btn-danger'));
  title = element.all(by.css('jhi-roles div h2#page-heading span')).first();

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

export class RolesUpdatePage {
  pageTitle = element(by.id('jhi-roles-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  roleTypeInput = element(by.id('field_roleType'));
  roleInput = element(by.id('field_role'));
  codeInput = element(by.id('field_code'));
  apptypeSelect = element(by.id('field_apptype'));
  appSelect = element(by.id('field_app'));
  appuserSelect = element(by.id('field_appuser'));

  async getPageTitle() {
    return this.pageTitle.getText();
  }

  async setRoleTypeInput(roleType) {
    await this.roleTypeInput.sendKeys(roleType);
  }

  async getRoleTypeInput() {
    return await this.roleTypeInput.getAttribute('value');
  }

  async setRoleInput(role) {
    await this.roleInput.sendKeys(role);
  }

  async getRoleInput() {
    return await this.roleInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async apptypeSelectLastOption() {
    await this.apptypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async apptypeSelectOption(option) {
    await this.apptypeSelect.sendKeys(option);
  }

  getApptypeSelect(): ElementFinder {
    return this.apptypeSelect;
  }

  async getApptypeSelectedOption() {
    return await this.apptypeSelect.element(by.css('option:checked')).getText();
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

  async appuserSelectLastOption() {
    await this.appuserSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async appuserSelectOption(option) {
    await this.appuserSelect.sendKeys(option);
  }

  getAppuserSelect(): ElementFinder {
    return this.appuserSelect;
  }

  async getAppuserSelectedOption() {
    return await this.appuserSelect.element(by.css('option:checked')).getText();
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

export class RolesDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-roles-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-roles'));

  async getDialogTitle() {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
