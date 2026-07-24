import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class VisibilityPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/visibility";
  }

  // <button class="btn btn-primary" type="button" id="hideButton" onclick="HideButtons()">Hide</button>
  async clickHideButton() {
    await this.page.getByRole("button", { name: "Hide", exact: true }).click();
  }

  // <button class="btn btn-danger" type="button" id="removedButton">Removed</button>
  // (Hide removes this button from the DOM entirely)
  async getRemovedButton() {
    return this.page.getByRole("button", { name: "Removed", exact: true });
  }

  // <button class="btn btn-warning" type="button" id="zeroWidthButton">Zero Width</button>
  // (Hide shrinks this button's width/height to 0)
  async getZeroWidthButton() {
    return this.page.getByRole("button", { name: "Zero Width", exact: true });
  }

  // <button class="btn btn-success" type="button" id="overlappedButton">Overlapped</button>
  // (Hide places another element on top of this one)
  async getOverlappedButton() {
    return this.page.getByRole("button", { name: "Overlapped", exact: true });
  }

  // <button class="btn btn-info" type="button" id="transparentButton">Opacity 0</button>
  async getTransparentButton() {
    return this.page.getByRole("button", { name: "Opacity 0", exact: true });
  }

  // <button class="btn btn-info" type="button" id="offscreenButton">Offscreen</button>
  // (Hide moves this button outside the viewport)
  async getOffscreenButton() {
    return this.page.getByRole("button", { name: "Offscreen", exact: true });
  }

  // <button class="btn btn-info" type="button" id="notdisplayedButton">Display None</button>
  async getNotDisplayedButton() {
    return this.page.getByRole("button", {
      name: "Display None",
      exact: true,
    });
  }

  // <button class="btn btn-info" type="button" id="invisibleButton">Visibility Hidden</button>
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
