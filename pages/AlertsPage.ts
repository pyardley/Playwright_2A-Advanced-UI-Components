import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AlertsPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/alerts";
  }

  async clickAlertButton() {
    await this.page.getByRole("button", { name: "Alert" }).click();
  }

  async clickConfirmButton() {
    await this.page.getByRole("button", { name: "Confirm" }).click();
  }

  async clickPromptButton() {
    await this.page.getByRole("button", { name: "Prompt" }).click();
  }
}
