import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AutoWaitPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/autowait";
  }

  // <select class="form-select" id="element-type" name="element-type">
  //   <option value="button">Button</option>
  //   <option value="input">Input</option>
  //   <option value="textarea">Textarea</option>
  //   <option value="select">Select</option>
  //   <option value="label">Label</option>
  // </select>
  async setElementTypeSelector(elementType: string) {
    await this.page
      .getByLabel("Choose an element type:")
      .selectOption(elementType);
  }

  // <input class="form-check-input" type="checkbox" id="visible" name="visible" checked>
  async unsetVisibleCheckbox() {
    await this.page.getByLabel("Visible").uncheck();
  }

  // <input class="form-check-input" type="checkbox" id="enabled" name="enabled" checked>
  async unsetEnabledCheckbox() {
    await this.page.getByLabel("Enabled").uncheck();
  }

  // <input class="form-check-input" type="checkbox" id="editable" name="editable" checked>
  async unsetEditableCheckbox() {
    await this.page.getByLabel("Editable").uncheck();
  }

  // <input class="form-check-input" type="checkbox" id="ontop" name="ontop" checked>
  async unsetOnTopCheckbox() {
    await this.page.getByLabel("On Top").uncheck();
  }

  // <input class="form-check-input" type="checkbox" id="nonzero" name="nonzero" checked>
  async unsetNonZeroSizeCheckbox() {
    await this.page.getByLabel("Non Zero Size").uncheck();
  }

  // <button class="btn btn-secondary" id="applyButton3" type="button" onclick="applySettings(3)">Apply 3s</button>
  async clickApply3sButton() {
    await this.page.getByRole("button", { name: "Apply 3s" }).click();
  }

  // <button class="btn btn-secondary" id="applyButton5" type="button" onclick="applySettings(5)">Apply 5s</button>
  async clickApply5sButton() {
    await this.page.getByRole("button", { name: "Apply 5s" }).click();
  }

  // <button class="btn btn-secondary" id="applyButton10" type="button" onclick="applySettings(10)">Apply 10s</button>
  async clickApply10sButton() {
    await this.page.getByRole("button", { name: "Apply 10s" }).click();
  }

  // <div id="opstatus">---</div>
  async getStatusMessage() {
    return (await this.page.locator("#opstatus").innerText()).trim();
  }

  // #target's tag changes based on the "Choose an element type" dropdown:
  // <button id="target" class="btn btn-primary">Button</button>
  // <input type="text" id="target" class="form-control">
  // <textarea id="target" class="form-control"></textarea>
  // <select id="target" class="form-select"><option value="Item 1">Item 1</option>...</select>
  // <label id="target" class="form-label">This is a Label</label>
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

  // <button id="target" class="btn btn-primary">Button</button>
  async clickTargetButton() {
    await (await this.getTargetControl()).click();
  }

  // <input type="text" id="target" class="form-control">
  async setInputText(text: string) {
    await (await this.getTargetControl()).fill(text);
    await (await this.getTargetControl()).press("Enter");
  }

  // <textarea id="target" class="form-control"></textarea>
  async setInputTextArea(text: string) {
    await (await this.getTargetControl()).fill(text);
    await (await this.getTargetControl()).press("Tab");
  }

  // <select id="target" class="form-select"><option value="Item 1">Item 1</option>...</select>
  async setTargetSelector(selector: string) {
    await (await this.getTargetControl()).selectOption(selector);
  }

  // <label id="target" class="form-label">This is a Label</label>
  async clickTargetLabel() {
    await (await this.getTargetControl()).click();
  }
}
