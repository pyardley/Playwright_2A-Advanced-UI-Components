import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TextInputPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/textinput";
  }

  // <input class="form-control" type="text" placeholder="MyButton" id="newButtonName">
  async fillTextInputField(text: string) {
    await this.page.locator("#newButtonName").fill(text);
  }

  // <button class="btn btn-primary" type="button" id="updatingButton">Button That Should Change it's Name Based on Input Value</button>
  async clickPysicalButton() {
    const button = this.page.locator("#updatingButton");
    await button.click();

    return (await button.innerText()).trim();
  }
}
