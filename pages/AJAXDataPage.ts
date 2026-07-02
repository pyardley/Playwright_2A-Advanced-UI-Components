import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AjaxDataPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/ajax";
  }

  async clickOnAjaxButton() {
    await await this.page
      .getByRole("button", {
        name: "Button Triggering AJAX Request",
        exact: true,
      })
      .click();
  }

  async getAjaxContent() {
    const contentLocator = this.page.getByRole("button", {
      name: "Button Triggering AJAX Request",
      exact: true,
    });
    await contentLocator.waitFor({ state: "visible", timeout: 15000 });
    return contentLocator;
  }
}
