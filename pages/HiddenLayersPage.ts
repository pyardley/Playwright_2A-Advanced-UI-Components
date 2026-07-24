import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HiddenLayersPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/hiddenlayers";
  }

  // <button class="btn btn-success" type="button" id="greenButton">Button</button>
  async clickOnGreenButton() {
    try {
      await this.page.locator("#greenButton").click({ timeout: 2000 });
      return true; // Return true to indicate the button was clicked
    } catch {
      return false; // Click was intercepted by an overlapping element
    }
  }
}
