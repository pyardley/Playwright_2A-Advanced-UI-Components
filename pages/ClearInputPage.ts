import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClearInputPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/clearinput";
  }

  async clearInputText() {
    await this.page.getByLabel("Input (type=text)", { exact: true }).clear();
  }

  async clearTextArea() {
    await this.page.getByLabel("Textarea", { exact: true }).clear();
  }

  async clearInputPassword() {
    await this.page
      .getByLabel("Input (type=password)", { exact: true })
      .clear();
  }

  async clearInputEmail() {
    await this.page.getByLabel("Input (type=email)", { exact: true }).clear();
  }

  async clearInputNumber() {
    await this.page.getByLabel("Input (type=number)", { exact: true }).clear();
  }

  async clearInputSearch() {
    await this.page.getByLabel("Input (type=search)", { exact: true }).clear();
  }

  async clearInputUrl() {
    await this.page.getByLabel("Input (type=url)", { exact: true }).clear();
  }

  async clearInputTel() {
    await this.page.getByLabel("Input (type=tel)", { exact: true }).clear();
  }

  async clearInputEditableDiv() {
    // <div contenteditable> isn't a labelable element, so the page's
    // <label for="clearContentEditable"> doesn't give it an accessible
    // name or role - getByLabel/getByRole can't find it. Confirmed live
    // that its computed ARIA role is null despite the label association.
    await this.page.locator("#clearContentEditable").clear();
  }

  async getNonEmptyFieldsRemainingText() {
    return (await this.page.locator("#opstatus").innerText()).trim();
  }
}
