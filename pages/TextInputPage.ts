import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TextInputPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/textinput";
  }

  async fillTextInputField(text: string) {
    await this.page.locator("#newButtonName").fill(text);
  }

  async clickPysicalButton() {
    const button = this.page.locator("#updatingButton");
    await button.click();

    return (await button.innerText()).trim();
  }
}
