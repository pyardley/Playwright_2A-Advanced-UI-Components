import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DisabledInputPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/disabledinput";
  }

  // <input class="form-control" id="inputField" title="Edit Field" onchange="setStatus('Value changed to: ' + this.value)" placeholder="Change me...">
  async getEditField() {
    return this.page.getByRole("textbox", { name: "Edit Field" });
  }

  // <button class="btn btn-primary" id="enableButton" onclick="enableEditFieldWithDelay()">Enable Edit Field with 5 seconds delay</button>
  async clickEnableEditFieldButton() {
    await this.page
      .getByRole("button", { name: "Enable Edit Field with 5 seconds delay" })
      .click();
  }

  // <input class="form-control" id="inputField" title="Edit Field" onchange="setStatus('Value changed to: ' + this.value)" placeholder="Change me...">
  async updateEditFieldValue(newValue: string) {
    const editField = await this.getEditField();
    await editField.fill(newValue, { timeout: 6000 });
    await editField.press("Enter");
  }

  // <div id="opstatus">---</div>
  async getValueChangedMessage() {
    return (await this.page.locator("#opstatus").innerText()).trim();
  }
}
