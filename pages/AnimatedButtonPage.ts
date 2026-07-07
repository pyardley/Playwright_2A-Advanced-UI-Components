import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AnimatedButtonPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/animation";
  }

  async getAnimatedButton() {
    return this.page.getByRole("button", { name: "Start Animation" });
  }

  async clickAnimatedButton() {
    await (await this.getAnimatedButton()).click();
  }

  async getMovingTargetButton() {
    return this.page.getByRole("button", { name: "Moving Target" });
  }

  async clickMovingTargetButton() {
    await (await this.getMovingTargetButton()).click();
  }

  async getAnimationCompleteMessage() {
    return this.page.getByText(
      "Moving Target clicked. It's class name is 'btn btn-primary'",
    );
  }
}
