import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FramesPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/frames";
  }

  async getFrame1() {
    return this.page.frameLocator("#frame-outer");
  }

  async getFrame2() {
    return (await this.getFrame1()).frameLocator("#frame-inner");
  }

  async clickOuterEditButton() {
    await (await this.getFrame1())
      .getByRole("button", { name: "Edit" })
      .click();
  }

  async clickOuterSubmitButton() {
    await (await this.getFrame1())
      .getByRole("button", { name: "Submit" })
      .click();
  }

  async getOuterMessage() {
    return (
      await (await this.getFrame1()).locator("#result").innerText()
    ).trim();
  }

  async clickInnerEditButton() {
    await (await this.getFrame2())
      .getByRole("button", { name: "Edit" })
      .click();
  }

  async clickInnerSubmitButton() {
    await (await this.getFrame2())
      .getByRole("button", { name: "Submit" })
      .click();
  }

  async getInnerMessage() {
    return (
      await (await this.getFrame2()).locator("#result").innerText()
    ).trim();
  }
}
