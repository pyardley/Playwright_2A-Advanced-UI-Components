import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SelectPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/select";
  }

  // <select class="form-control" id="selectLanguage" onchange="updateSingleStatus('selectLanguage', 'statusLanguage')">
  //   <option value="">-- Please select --</option>
  //   <option value="js">JavaScript</option>
  //   <option value="py">Python</option>
  //   ...
  // </select>
  async selectProgrammingLanguage(lang: string) {
    await this.page
      .getByLabel("Programming Language (single-select)", { exact: true })
      .selectOption(lang);
  }

  // <div class="text-muted mt-1" id="statusLanguage">Selected: none</div>
  async getProgrammingLanguageMessage() {
    return (await this.page.locator("#statusLanguage").innerText()).trim();
  }

  // <select class="form-control" id="selectCity" onchange="updateSingleStatus('selectCity', 'statusCity')">
  //   <option value="">-- Please select --</option>
  //   <option value="nyc">New&nbsp;York</option>
  //   <option value="la">Los&nbsp;Angeles</option>
  //   ...
  // </select>
  async selectCity(city: string) {
    await this.page
      .getByLabel("City (contains non-breaking spaces)", { exact: true })
      .selectOption(city);
  }

  // <div class="text-muted mt-1" id="statusCity">Selected: none</div>
  async getCityMessage() {
    return (await this.page.locator("#statusCity").innerText()).trim();
  }

  // <select class="form-control" id="selectProduct" onchange="updateSingleStatus('selectProduct', 'statusProduct')">
  //   <option value="">-- Please select --</option>
  //   <option value="v1.0">Release 1.0</option>
  //   <option value="v2.0">Release 2.0</option>
  //   ...
  // </select>
  async selectVersion(ver: string) {
    await this.page
      .getByLabel("Product Version (select by value)", { exact: true })
      .selectOption(ver);
  }

  // <div class="text-muted mt-1" id="statusProduct">Selected: none</div>
  async getVersionMessage() {
    return (await this.page.locator("#statusProduct").innerText()).trim();
  }

  // <select class="form-control" id="selectColors" multiple size="6" onchange="updateMultiStatus('selectColors', 'statusColors')">
  //   <option value="red">Red</option>
  //   <option value="green">Green</option>
  //   <option value="blue">Blue</option>
  //   ...
  // </select>
  async selectColors(colors: string[]) {
    const control = this.page.getByLabel(
      "Colors (multi-select, hold Ctrl/Cmd to select multiple)",
      { exact: true },
    );
    await control.selectOption(await this.addToCurrentSelection(control, colors));
  }

  // <div class="text-muted mt-1" id="statusColors">Selected: none</div>
  async getColorsMessage() {
    return (await this.page.locator("#statusColors").innerText()).trim();
  }

  // <select class="form-control" id="selectFruits" multiple size="7" onchange="updateMultiStatus('selectFruits', 'statusFruits')">
  //   <option value="apple" selected>Apple</option>
  //   <option value="banana">Banana</option>
  //   <option value="cherry" selected>Cherry</option>
  //   <option value="date">Date</option>
  //   ...
  // </select>
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

  // <div class="text-success mt-1" id="statusFruits">Selected: Apple, Cherry, Grape</div>
  async getFruitsMessage() {
    return (await this.page.locator("#statusFruits").innerText()).trim();
  }
}
