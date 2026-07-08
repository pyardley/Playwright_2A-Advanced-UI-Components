import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SelectPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/select";
  }

  async selectProgrammingLanguage(lang: string) {
    await this.page
      .getByLabel("Programming Language (single-select)", { exact: true })
      .selectOption(lang);
  }

  async getProgrammingLanguageMessage() {
    return (await this.page.locator("#statusLanguage").innerText()).trim();
  }

  async selectCity(city: string) {
    await this.page
      .getByLabel("City (contains non-breaking spaces)", { exact: true })
      .selectOption(city);
  }

  async getCityMessage() {
    return (await this.page.locator("#statusCity").innerText()).trim();
  }

  async selectVersion(ver: string) {
    await this.page
      .getByLabel("Product Version (select by value)", { exact: true })
      .selectOption(ver);
  }

  async getVersionMessage() {
    return (await this.page.locator("#statusProduct").innerText()).trim();
  }

  async selectColors(colors: string[]) {
    const control = this.page.getByLabel(
      "Colors (multi-select, hold Ctrl/Cmd to select multiple)",
      { exact: true },
    );
    await control.selectOption(await this.addToCurrentSelection(control, colors));
  }

  async getColorsMessage() {
    return (await this.page.locator("#statusColors").innerText()).trim();
  }

  async selectFruits(fruits: string[]) {
    // Fruits arrives with Apple/Cherry/Grape pre-selected. selectOption()
    // replaces the whole selection, but real users add to it by
    // Ctrl/Cmd-clicking - so the new values are merged with whatever is
    // already selected rather than replacing it.
    const control = this.page.getByLabel(
      "Fruits (multi-select, some pre-selected)",
      { exact: true },
    );
    await control.selectOption(await this.addToCurrentSelection(control, fruits));
  }

  private async addToCurrentSelection(
    control: ReturnType<Page["getByLabel"]>,
    values: string[],
  ) {
    const alreadySelected = await control.evaluate((el: HTMLSelectElement) =>
      Array.from(el.selectedOptions).map((option) => option.value),
    );
    return [...new Set([...alreadySelected, ...values])];
  }

  async getFruitsMessage() {
    return (await this.page.locator("#statusFruits").innerText()).trim();
  }
}
