import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DynamicIDPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/dynamicid";
  }

  async clickOnDynamicIdLink() {
    await this.page
      .getByRole("button", { name: "Button with Dynamic ID" })
      .click();
  }
}
