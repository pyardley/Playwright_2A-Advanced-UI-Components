import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AutoWaitPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/autowait";
  }

  async setElementTypeSelector(elementType: string) {
    await this.page
      .getByLabel("Choose an element type:")
      .selectOption(elementType);
  }

  async unsetVisibleCheckbox() {
    await this.page.getByLabel("Visible").uncheck();
  }

  async unsetEnabledCheckbox() {
    await this.page.getByLabel("Enabled").uncheck();
  }

  async unsetEditableCheckbox() {
    await this.page.getByLabel("Editable").uncheck();
  }

  async unsetOnTopCheckbox() {
    await this.page.getByLabel("On Top").uncheck();
  }

  async unsetNonZeroSizeCheckbox() {
    await this.page.getByLabel("Non Zero Size").uncheck();
  }

  async clickApply3sButton() {
    await this.page.getByRole("button", { name: "Apply 3s" }).click();
  }

  async clickApply5sButton() {
    await this.page.getByRole("button", { name: "Apply 5s" }).click();
  }

  async clickApply10sButton() {
    await this.page.getByRole("button", { name: "Apply 10s" }).click();
  }

  async getStatusMessage() {
    return (await this.page.locator("#opstatus").innerText()).trim();
  }

  async getTargetControl() {
    return this.page.locator("#target");
  }

  // When "On Top" is unset, the target stays visible but an overlay div
  // covers it, so `toBeVisible`/`toBeHidden` can't detect the state change.
  async isTargetOnTop() {
    return (await this.getTargetControl()).evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const topEl = document.elementFromPoint(
        rect.x + rect.width / 2,
        rect.y + rect.height / 2,
      );
      return topEl === el;
    });
  }

  async getTargetControlTagName() {
    return (await this.getTargetControl()).evaluate((el) => el.tagName);
  }

  async clickTargetButton() {
    await (await this.getTargetControl()).click();
  }

  async setInputText(text: string) {
    await (await this.getTargetControl()).fill(text);
    await (await this.getTargetControl()).press("Enter");
  }

  async setInputTextArea(text: string) {
    await (await this.getTargetControl()).fill(text);
    await (await this.getTargetControl()).press("Tab");
  }

  async setTargetSelector(selector: string) {
    await (await this.getTargetControl()).selectOption(selector);
  }

  async clickTargetLabel() {
    await (await this.getTargetControl()).click();
  }
}
