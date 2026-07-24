import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CssSelectorsPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/cssselectors";
  }

  // <button class="btn btn-primary" id="primary-btn" data-id="primary-btn">Primary Button</button>
  async clickPrimaryButton() {
    await this.page.locator("#primary-btn").click();
  }

  // <button class="btn btn-info css-btn" data-id="class-btn-first">First</button>
  async clickFirstButton() {
    await this.page.locator('[data-id="class-btn-first"]').click();
  }

  // <button class="btn btn-info css-btn" data-id="class-btn-second">Second</button>
  async clickSecondButton() {
    await this.page.locator('[data-id="class-btn-second"]').click();
  }

  // <button class="btn btn-info css-btn highlight" data-id="class-btn-third">Third</button>
  async clickThirdButton() {
    await this.page.locator('[data-id="class-btn-third"]').click();
  }

  // <input class="form-control mb-2" type="text" data-testid="username-input" placeholder="Username" data-id="attr-username">
  async setUsername(username: string) {
    await this.page.getByTestId("username-input").fill(username);
  }

  // <input class="form-control mb-2" type="email" data-testid="email-input" placeholder="Email" data-id="attr-email">
  async setEmail(email: string) {
    await this.page.getByTestId("email-input").fill(email);
  }

  // <a class="btn btn-link" href="https://example.com" target="_blank" data-id="attr-link">External Link</a>
  async clickExternalLink() {
    await this.page
      .getByRole("link", { name: "External Link", exact: true })
      .click();
  }

  // <span class="badge badge-success ml-2" data-status="active" data-id="attr-active">Active</span>
  async clickActiveBadge() {
    await this.page.locator('[data-status="active"]').click();
  }

  // <span class="badge badge-secondary ml-2" data-status="inactive" data-id="attr-inactive">Inactive</span>
  async clickInactiveBadge() {
    await this.page.locator('[data-status="inactive"]').click();
  }

  // <li class="combo-item" data-id="combo-item-1">Item 1</li>
  async clickListItem1() {
    // The "listitem" ARIA role doesn't compute an accessible name from
    // content, so getByRole's name filter can never match these <li>s.
    await this.page.getByText("Item 1", { exact: true }).click();
  }

  // <li class="combo-item special" data-id="combo-item-2">Item 2 (special)</li>
  async clickListItem2() {
    await this.page.getByText("Item 2 (special)", { exact: true }).click();
  }

  // <li class="combo-item" data-id="combo-item-3">Item 3</li>
  async clickListItem3() {
    await this.page.getByText("Item 3", { exact: true }).click();
  }

  // <p class="first-para" data-id="combo-para-1">First paragraph</p>
  async clickFirstPara() {
    await this.page.locator('[data-id="combo-para-1"]').click();
  }

  // <p class="second-para" data-id="combo-para-2">Second paragraph (adjacent sibling)</p>
  async clickSecondPara() {
    await this.page.locator('[data-id="combo-para-2"]').click();
  }

  // <span class="following-span" data-id="combo-span">Following span (general sibling)</span>
  async clickSpan() {
    await this.page.locator('[data-id="combo-span"]').click();
  }

  // <tr data-id="table-row-1"><td data-id="cell-1-1">Row 1, Cell 1</td><td data-id="cell-1-2">Row 1, Cell 2</td></tr>
  async clickCell(rowNum: number, colNum: number) {
    const row = this.page.locator(`[data-id="table-row-${rowNum}"]`);
    const cell = row.locator(`[data-id="cell-${rowNum}-${colNum}"]`);
    await cell.click();
  }

  // <button class="btn btn-success mb-2" id="visible-btn" data-id="visible-btn">I am visible</button>
  async clickIAmVisibleButton() {
    await this.page
      .getByRole("button", { name: "I am visible", exact: true })
      .click();
  }

  // These live inside three nested levels of (open) shadow DOM, but
  // Playwright's locators pierce open shadow roots automatically, so no
  // special shadow-piercing syntax is needed.
  // <css-outer-component data-id="shadow-host-outer">
  //   #shadow-root
  //     <button class="outer-btn" id="shadow-btn-l1" data-level="1" data-id="shadow-l1-btn">Level 1 Button</button>
  async clickLevel1Button() {
    await this.page
      .getByRole("button", { name: "Level 1 Button", exact: true })
      .click();
  }

  // <css-outer-component data-id="shadow-host-outer">
  //   #shadow-root
  //     <css-inner-component data-id="shadow-host-inner">
  //       #shadow-root
  //         <button class="inner-btn" id="shadow-btn-l2" data-level="2" data-id="shadow-l2-btn">Level 2 Button</button>
  async clickLevel2Button() {
    await this.page
      .getByRole("button", { name: "Level 2 Button", exact: true })
      .click();
  }

  // <css-outer-component data-id="shadow-host-outer">
  //   #shadow-root
  //     <css-inner-component data-id="shadow-host-inner">
  //       #shadow-root
  //         <css-deep-component data-id="shadow-host-deep">
  //           #shadow-root
  //             <button class="deep-btn" id="shadow-btn-l3" data-level="3" data-id="shadow-l3-btn">Level 3 Button</button>
  async clickLevel3Button() {
    await this.page
      .getByRole("button", { name: "Level 3 Button", exact: true })
      .click();
  }

  // <css-outer-component data-id="shadow-host-outer">
  //   #shadow-root
  //     <input type="text" id="shadow-input-l1" placeholder="Level 1 Input" class="shadow-input" data-id="shadow-l1-input">
  async setLevel1Input(value: string) {
    await this.page.getByPlaceholder("Level 1 Input", { exact: true }).fill(value);
  }

  // <css-outer-component data-id="shadow-host-outer">
  //   #shadow-root
  //     <css-inner-component data-id="shadow-host-inner">
  //       #shadow-root
  //         <input type="text" id="shadow-input-l2" placeholder="Level 2 Input" class="shadow-input" data-id="shadow-l2-input">
  async setLevel2Input(value: string) {
    await this.page.getByPlaceholder("Level 2 Input", { exact: true }).fill(value);
  }

  // <css-outer-component data-id="shadow-host-outer">
  //   #shadow-root
  //     <css-inner-component data-id="shadow-host-inner">
  //       #shadow-root
  //         <css-deep-component data-id="shadow-host-deep">
  //           #shadow-root
  //             <input type="text" id="shadow-input-l3" placeholder="Level 3 Input" class="shadow-input" data-id="shadow-l3-input">
  async setLevel3Input(value: string) {
    await this.page.getByPlaceholder("Level 3 Input", { exact: true }).fill(value);
  }
}
