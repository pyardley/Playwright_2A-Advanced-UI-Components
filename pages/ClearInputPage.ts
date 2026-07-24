import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClearInputPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/clearinput";
  }

  // <input class="form-control clear-target" id="clearInput" type="text" value="Initial Text Value" oninput="updateStatus()">
  async clearInputText() {
    await this.page.getByLabel("Input (type=text)", { exact: true }).clear();
  }

  // <textarea class="form-control clear-target" id="clearTextarea" rows="3" oninput="updateStatus()">Lorem ipsum dolor sit amet...</textarea>
  async clearTextArea() {
    await this.page.getByLabel("Textarea", { exact: true }).clear();
  }

  // <input class="form-control clear-target" id="clearPassword" type="password" value="MySecretPassword" oninput="updateStatus()">
  async clearInputPassword() {
    await this.page
      .getByLabel("Input (type=password)", { exact: true })
      .clear();
  }

  // <input class="form-control clear-target" id="clearEmail" type="email" value="user@example.com" oninput="updateStatus()">
  async clearInputEmail() {
    await this.page.getByLabel("Input (type=email)", { exact: true }).clear();
  }

  // <input class="form-control clear-target" id="clearNumber" type="number" value="42" oninput="updateStatus()">
  async clearInputNumber() {
    await this.page.getByLabel("Input (type=number)", { exact: true }).clear();
  }

  // <input class="form-control clear-target" id="clearSearch" type="search" value="Search query" oninput="updateStatus()">
  async clearInputSearch() {
    await this.page.getByLabel("Input (type=search)", { exact: true }).clear();
  }

  // <input class="form-control clear-target" id="clearUrl" type="url" value="https://www.example.com" oninput="updateStatus()">
  async clearInputUrl() {
    await this.page.getByLabel("Input (type=url)", { exact: true }).clear();
  }

  // <input class="form-control clear-target" id="clearTel" type="tel" value="+1 (555) 123-4567" oninput="updateStatus()">
  async clearInputTel() {
    await this.page.getByLabel("Input (type=tel)", { exact: true }).clear();
  }

  // <div class="form-control clear-target" id="clearContentEditable" contenteditable="true" oninput="updateStatus()">This is an editable div element...</div>
  async clearInputEditableDiv() {
    // <div contenteditable> isn't a labelable element, so the page's
    // <label for="clearContentEditable"> doesn't give it an accessible
    // name or role - getByLabel/getByRole can't find it. Confirmed live
    // that its computed ARIA role is null despite the label association.
    await this.page.locator("#clearContentEditable").clear();
  }

  // <div id="opstatus">Non-empty fields remaining: 9</div>
  async getNonEmptyFieldsRemainingText() {
    return (await this.page.locator("#opstatus").innerText()).trim();
  }
}
