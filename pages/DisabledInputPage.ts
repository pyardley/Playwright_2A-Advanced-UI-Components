import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DisabledInputPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/disabledinput";
  }

  async getEditField() {
    return this.page.getByRole("textbox", { name: "Edit Field" });
  }

  async clickEnableEditFieldButton() {
    await this.page
      .getByRole("button", { name: "Enable Edit Field with 5 seconds delay" })
      .click();
  }

  async updateEditFieldValue(newValue: string) {
    const editField = await this.getEditField();
    await editField.fill(newValue, { timeout: 6000 });
    await editField.press("Enter");
  }

  async getValueChangedMessage() {
    return (await this.page.locator("#opstatus").innerText()).trim();
  }
}
