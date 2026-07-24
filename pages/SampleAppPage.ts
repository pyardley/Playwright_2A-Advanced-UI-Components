import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SampleAppPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/sampleapp";
  }

  // <input class="form-control" type="text" placeholder="User Name" name="UserName" id="8f97f30f-c012-5232-dd3f-ceb43ecb7b9b">
  // (id is regenerated on every load, hence getByPlaceholder instead of #id)
  async setUserName(username: string) {
    await this.page
      .getByPlaceholder("User Name", { exact: true })
      .fill(username);
  }

  // <input class="form-control" type="password" placeholder="********" name="Password" id="d879ac89-83db-c541-8309-255fe40d5c58">
  async setPassword(password: string) {
    await this.page
      .getByPlaceholder("********", { exact: true })
      .fill(password);
  }

  // <button class="btn btn-primary" type="button" id="login" onclick="Login()">Log In</button>
  async clickLogInButton() {
    await this.page.getByRole("button", { name: "Log in" }).click();
  }

  // <label class="text-info" id="loginstatus">User logged out.</label>
  async getLoginMessage(): Promise<Locator> {
    // #loginstatus is a plain <label> with no ARIA role, so getByRole
    // can't locate it - there's no accessible-name alternative here.
    return this.page.locator("#loginstatus");
  }

  // <label class="text-info" id="loginstatus">User logged out.</label>
  // (same element - its text/class change to reflect success or failure)
  async getLoginErrorMessage(): Promise<Locator> {
    return this.page.locator("#loginstatus");
  }
}
