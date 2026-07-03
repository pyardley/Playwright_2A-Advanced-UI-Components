import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class VisibilityPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/visibility";
  }

  async clickHideButton() {
    await this.page.getByRole("button", { name: "Hide", exact: true }).click();
  }

  async getRemovedButton() {
    return this.page.getByRole("button", { name: "Removed", exact: true });
  }

  async getZeroWidthButton() {
    return this.page.getByRole("button", { name: "Zero Width", exact: true });
  }

  async getOverlappedButton() {
    return this.page.getByRole("button", { name: "Overlapped", exact: true });
  }

  async getTransparentButton() {
    return this.page.getByRole("button", { name: "Opacity 0", exact: true });
  }

  async getOffscreenButton() {
    return this.page.getByRole("button", { name: "Offscreen", exact: true });
  }

  async getNotDisplayedButton() {
    return this.page.getByRole("button", {
      name: "Display None",
      exact: true,
    });
  }

  async getVisibilityHiddenButton() {
    return this.page.getByRole("button", {
      name: "Visibility Hidden",
      exact: true,
    });
  }

  // Playwright's built-in visibility check only covers layout/display/
  // visibility CSS - it doesn't detect opacity: 0 (still hit-testable),
  // an element positioned off-screen (still has a non-empty box), or
  // another element covering it at z-order (still "visible" by itself).
  // This combines all three so it matches what a real user could
  // actually see and click.
  async isActuallyVisible(locator: Locator): Promise<boolean> {
    if (!(await locator.isVisible())) {
      return false;
    }
    const opacity = await locator.evaluate(
      (el) => getComputedStyle(el).opacity,
    );
    if (opacity === "0") {
      return false;
    }
    try {
      await locator.click({ trial: true, timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }
}
