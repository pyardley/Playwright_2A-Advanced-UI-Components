import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClassAttributePage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/classattr";
  }

  async clickOnBlueButton() {
    await this.page.locator("button.btn-primary").click();
  }
}
