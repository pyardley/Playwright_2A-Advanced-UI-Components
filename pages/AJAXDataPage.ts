import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AjaxDataPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/ajax";
  }

  // <button class="btn btn-primary" type="button" id="ajaxButton" onclick="LoadLabel()">Button Triggering AJAX Request</button>
  async clickOnAjaxButton() {
    await await this.page
      .getByRole("button", {
        name: "Button Triggering AJAX Request",
        exact: true,
      })
      .click();
  }

  // <button class="btn btn-primary" type="button" id="ajaxButton" onclick="LoadLabel()">Button Triggering AJAX Request</button>
  async getAjaxContent() {
    const contentLocator = this.page.getByRole("button", {
      name: "Button Triggering AJAX Request",
      exact: true,
    });
    await contentLocator.waitFor({ state: "visible", timeout: 15000 });
    return contentLocator;
  }
}
