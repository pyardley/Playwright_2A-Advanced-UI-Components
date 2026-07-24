import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClientSideDelayPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/clientdelay";
  }

  // <button class="btn btn-primary" type="button" id="ajaxButton" onclick="CreateLabel()">Button Triggering Client Side Logic</button>
  async clickOnClientSideDelayButton() {
    await await this.page
      .getByRole("button", {
        name: "Button Triggering Client Side Logic",
        exact: true,
      })
      .click();
  }

  // <p class="bg-success">Data calculated on the client side.</p>
  // (appended to #content by CreateLabel() after a 15s setTimeout)
  async getClientSideDelayContent() {
    const contentLocator = this.page.getByText(
      "Data calculated on the client side.",
      { exact: true },
    );

    await contentLocator.waitFor({ state: "visible", timeout: 16000 });
    return contentLocator;
  }
}
