import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OverlappedElementPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/overlapped";
  }

  async setId(id: string) {
    await this.page.getByPlaceholder("Id", { exact: true }).fill(id);
  }

  async setName(name: string) {
    await this.page.getByPlaceholder("Name", { exact: true }).fill(name);
  }
}
