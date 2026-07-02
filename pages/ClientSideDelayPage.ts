import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ClientSideDelayPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/clientdelay";
  }

  async clickOnClientSideDelayButton() {
    await await this.page
      .getByRole("button", {
        name: "Button Triggering Client Side Logic",
        exact: true,
      })
      .click();
  }

  async getClientSideDelayContent() {
    const contentLocator = this.page.getByText(
      "Data calculated on the client side.",
      { exact: true },
    );

    await contentLocator.waitFor({ state: "visible", timeout: 16000 });
    return contentLocator;
  }
}
