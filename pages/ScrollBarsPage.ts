import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ScrollBarsPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/scrollbars";
  }

  async clickButton() {
    await this.page
      .getByRole("button", { name: "Hiding Button", exact: true })
      .click();
  }
}
