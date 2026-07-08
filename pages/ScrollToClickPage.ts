import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ScrollToClickPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/scrolltoclick";
  }

  async clickButton1() {
    await this.page
      .getByRole("button", { name: "Button 1", exact: true })
      .click();
  }

  async clickButton2() {
    await this.page
      .getByRole("button", { name: "Button 2", exact: true })
      .click();
  }

  async clickButton3() {
    await this.page
      .getByRole("button", { name: "Button 3", exact: true })
      .click();
  }

  // Each row's Flag button is visibility:hidden until its row is hovered,
  // and only one of the four rows has an enabled button - the rest are
  // permanently disabled. ".hover-row" is the site's own row container;
  // there's no accessible role linking a row's text to its button, so it's
  // used here purely to scope the hover/button pair together.
  async hoverAndClickRow(rowText: string) {
    const row = this.page.locator(".hover-row").filter({ hasText: rowText });
    await row.hover();

    const button = row.getByRole("button");
    if (await button.isDisabled()) {
      return false;
    }
    await button.click();
    return true;
  }

  async getMessageText() {
    return (await this.page.locator("#progressText").innerText()).trim();
  }
}
