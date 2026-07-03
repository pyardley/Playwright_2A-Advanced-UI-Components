import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PhysicalClickPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/click";
  }

  async clickPysicalButton() {
    const button = this.page.getByRole("button", {
      name: "Button That Ignores DOM Click Event",
      exact: true,
    });

    await button.click();

    return await button.evaluate((el) => el.classList.contains("btn-success"));
  }
}
