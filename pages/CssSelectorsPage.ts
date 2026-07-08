import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CssSelectorsPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/cssselectors";
  }

  async clickPrimaryButton() {
    await this.page.locator("#primary-btn").click();
  }

  async clickFirstButton() {
    await this.page.locator('[data-id="class-btn-first"]').click();
  }

  async clickSecondButton() {
    await this.page.locator('[data-id="class-btn-second"]').click();
  }

  async clickThirdButton() {
    await this.page.locator('[data-id="class-btn-third"]').click();
  }

  async setUsername(username: string) {
    await this.page.getByTestId("username-input").fill(username);
  }

  async setEmail(email: string) {
    await this.page.getByTestId("email-input").fill(email);
  }

  async clickExternalLink() {
    await this.page
      .getByRole("link", { name: "External Link", exact: true })
      .click();
  }

  async clickActiveBadge() {
    await this.page.locator('[data-status="active"]').click();
  }

  async clickInactiveBadge() {
    await this.page.locator('[data-status="inactive"]').click();
  }

  async clickListItem1() {
    // The "listitem" ARIA role doesn't compute an accessible name from
    // content, so getByRole's name filter can never match these <li>s.
    await this.page.getByText("Item 1", { exact: true }).click();
  }

  async clickListItem2() {
    await this.page.getByText("Item 2 (special)", { exact: true }).click();
  }

  async clickListItem3() {
    await this.page.getByText("Item 3", { exact: true }).click();
  }

  async clickFirstPara() {
    await this.page.locator('[data-id="combo-para-1"]').click();
  }

  async clickSecondPara() {
    await this.page.locator('[data-id="combo-para-2"]').click();
  }

  async clickSpan() {
    await this.page.locator('[data-id="combo-span"]').click();
  }

  async clickCell(rowNum: number, colNum: number) {
    const row = this.page.locator(`[data-id="table-row-${rowNum}"]`);
    const cell = row.locator(`[data-id="cell-${rowNum}-${colNum}"]`);
    await cell.click();
  }

  async clickIAmVisibleButton() {
    await this.page
      .getByRole("button", { name: "I am visible", exact: true })
      .click();
  }

  // These live inside three nested levels of (open) shadow DOM, but
  // Playwright's locators pierce open shadow roots automatically, so no
  // special shadow-piercing syntax is needed.
  async clickLevel1Button() {
    await this.page
      .getByRole("button", { name: "Level 1 Button", exact: true })
      .click();
  }

  async clickLevel2Button() {
    await this.page
      .getByRole("button", { name: "Level 2 Button", exact: true })
      .click();
  }

  async clickLevel3Button() {
    await this.page
      .getByRole("button", { name: "Level 3 Button", exact: true })
      .click();
  }

  async setLevel1Input(value: string) {
    await this.page.getByPlaceholder("Level 1 Input", { exact: true }).fill(value);
  }

  async setLevel2Input(value: string) {
    await this.page.getByPlaceholder("Level 2 Input", { exact: true }).fill(value);
  }

  async setLevel3Input(value: string) {
    await this.page.getByPlaceholder("Level 3 Input", { exact: true }).fill(value);
  }
}
