import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NonBreakingSpacePage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/nbsp";
  }

  async clickOnButton() {
    await this.page.getByRole("button", { name: "My Button" }).click();
  }
}
