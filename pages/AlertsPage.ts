import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AlertsPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/alerts";
  }

  // <button class="btn btn-primary" id="alertButton" type="button">Alert</button>
  async clickAlertButton() {
    await this.page.getByRole("button", { name: "Alert" }).click();
  }

  // <button class="btn btn-primary" id="confirmButton" type="button">Confirm</button>
  async clickConfirmButton() {
    await this.page.getByRole("button", { name: "Confirm" }).click();
  }

  // <button class="btn btn-primary" id="promptButton" type="button">Prompt</button>
  async clickPromptButton() {
    await this.page.getByRole("button", { name: "Prompt" }).click();
  }
}
