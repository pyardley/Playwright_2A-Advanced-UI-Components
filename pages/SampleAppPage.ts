import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SampleAppPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/sampleapp";
  }

  async setUserName(username: string) {
    await this.page
      .getByPlaceholder("User Name", { exact: true })
      .fill(username);
  }

  async setPassword(password: string) {
    await this.page
      .getByPlaceholder("********", { exact: true })
      .fill(password);
  }

  async clickLogInButton() {
    await this.page.getByRole("button", { name: "Log in" }).click();
  }

  async getLoginMessage(): Promise<Locator> {
    // #loginstatus is a plain <label> with no ARIA role, so getByRole
    // can't locate it - there's no accessible-name alternative here.
    return this.page.locator("#loginstatus");
  }

  async getLoginErrorMessage(): Promise<Locator> {
    return this.page.locator("#loginstatus");
  }
}
