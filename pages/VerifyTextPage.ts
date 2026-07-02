import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class VerifyTextPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/verifytext";
  }

  async getWelcomeText() {
    const container = this.page.locator(".bg-primary");
    const text = container.getByText("Welcome");
    return (await text.innerText()).trim();
  }
}
