import { BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShadowDOMPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    // navigator.clipboard requires a secure context. Confirmed live that
    // the site's HTTP origin has no navigator.clipboard at all (it's
    // undefined there, not merely permission-gated), and its HTTPS mirror
    // serves an untrusted cert - hence the absolute https:// URL here,
    // paired with ignoreHTTPSErrors scoped to just this test.
    this.path = "https://uitestingplayground.com/shadowdom";
  }

  async clickGenerateGUID() {
    await this.page.locator("#buttonGenerate").click();
  }

  async clickCopyGUID(context: BrowserContext) {
    // The site's own click handler writes to the clipboard, so
    // clipboard-write must be granted before the click, not after.
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await this.page.locator("#buttonCopy").click();
  }

  async getClipboardValue() {
    return (
      await this.page.evaluate(() => navigator.clipboard.readText())
    ).trim();
  }

  async getGeneratedGUID() {
    return (await this.page.locator("#editField").inputValue()).trim();
  }
}
