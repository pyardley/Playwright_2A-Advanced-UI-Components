import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class MouseOverPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/mouseover";
  }

  async clickClickMeLink() {
    // This <a> has no href, so it isn't exposed with role "link" in the
    // accessibility tree - getByRole can't find it.
    await this.page.getByText("Click me", { exact: true }).click();
  }

  async getClickMeClicks() {
    return (await this.page.locator("#clickCount").innerText()).trim();
  }

  async clickLinkButton() {
    // Same href-less <a> situation as the "Click me" link above.
    await this.page.getByText("Link Button", { exact: true }).click();
  }

  async getClickButtonClicks() {
    return (await this.page.locator("#clickButtonCount").innerText()).trim();
  }
}
