import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AnimatedButtonPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/animation";
  }

  // <button class="btn btn-secondary" id="animationButton" type="button" onclick="startAnimation()">Start Animation</button>
  async getAnimatedButton() {
    return this.page.getByRole("button", { name: "Start Animation" });
  }

  async clickAnimatedButton() {
    await (await this.getAnimatedButton()).click();
  }

  // <button class="btn btn-primary" id="movingTarget" type="button" onclick="movingTargetClicked()" onanimationend="animationDone()">Moving Target</button>
  async getMovingTargetButton() {
    return this.page.getByRole("button", { name: "Moving Target" });
  }

  async clickMovingTargetButton() {
    await (await this.getMovingTargetButton()).click();
  }

  // <div id="opstatus">Moving Target clicked. It's class name is 'btn btn-primary'</div>
  async getAnimationCompleteMessage() {
    return this.page.getByText(
      "Moving Target clicked. It's class name is 'btn btn-primary'",
    );
  }
}
