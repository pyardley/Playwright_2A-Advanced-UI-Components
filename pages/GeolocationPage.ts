import { BrowserContext, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GeolocationPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    // navigator.geolocation requires a secure context - the plain-HTTP
    // origin blocks the API outright, so this uses the site's HTTPS mirror
    // (untrusted cert, hence ignoreHTTPSErrors scoped to this test).
    this.path = "https://uitestingplayground.com/geolocation";
  }

  async clickRequestLocationButton() {
    await this.page
      .getByRole("button", { name: "Request Location" })
      .click();
  }

  async getLocationMessage() {
    return (await this.page.locator("#location").innerText()).trim();
  }

  // The site's Geolocation API call is blocked outright on the plain-HTTP
  // origin (no secure context), and Playwright-controlled browsers never
  // show a real permission prompt anyway - permission state is set via
  // context.grantPermissions()/clearPermissions() instead.
  async allowLocation(context: BrowserContext) {
    await context.grantPermissions(["geolocation"]);
  }

  async denyLocation(context: BrowserContext) {
    await context.clearPermissions();
  }
}
