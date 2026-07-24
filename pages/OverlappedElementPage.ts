import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OverlappedElementPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/overlapped";
  }

  // <input id="id" type="text" placeholder="Id">
  async setId(id: string) {
    await this.page.getByPlaceholder("Id", { exact: true }).fill(id);
  }

  // <input id="name" type="text" placeholder="Name">
  async setName(name: string) {
    await this.page.getByPlaceholder("Name", { exact: true }).fill(name);
  }
}
