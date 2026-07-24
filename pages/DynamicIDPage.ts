import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DynamicIDPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/dynamicid";
  }

  // <button class="btn btn-primary" type="button" id="6ce52c59-3d99-4898-c5a2-fd3463b6f0e4">Button with Dynamic ID</button>
  // (the id regenerates on every page load, hence getByRole instead of #id)
  async clickOnDynamicIdLink() {
    await this.page
      .getByRole("button", { name: "Button with Dynamic ID" })
      .click();
  }
}
