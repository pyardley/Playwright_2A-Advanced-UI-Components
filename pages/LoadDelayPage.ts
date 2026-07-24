import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoadDelayPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/loaddelay";
  }

  // <button class="btn btn-primary" type="button">Button Appearing After Delay</button>
  async clickOnDelayButton() {
    await await this.page
      .getByRole("button", {
        name: "Button Appearing After Delay",
        exact: true,
      })
      .click();
  }
}
