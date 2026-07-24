import { ElementHandle, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProgressBarPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/progressbar";
  }

  // <button class="btn btn-primary btn-test" type="button" id="startButton" onclick="Start()">Start</button>
  async clickStartButton() {
    await this.page.getByRole("button", { name: "Start", exact: true }).click();
  }

  // <button class="btn btn-info btn-test" type="button" id="stopButton" onclick="Stop()">Stop</button>
  async clickStopButton() {
    await this.page.getByRole("button", { name: "Stop", exact: true }).click();
  }

  // <div class="progress-bar bg-info" id="progressBar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
  async getProgressBarValue() {
    const progressBar = this.page.locator("#progressBar");
    await progressBar.waitFor({ state: "visible", timeout: 15000 });
    const rawValue = await progressBar.evaluate((el) =>
      el.getAttribute("aria-valuenow"),
    );
    return rawValue ? Number(rawValue) : 0;
  }

  // <button id="startButton" onclick="Start()">Start</button>
  // <button id="stopButton" onclick="Stop()">Stop</button>
  // <div class="progress-bar" id="progressBar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
  async waitForProgressBarToReachValue(targetValue: number) {
    // The progress bar increments in variable-sized steps on its own timer
    // and can skip straight past the target value, so this can't wait for
    // an exact match. It also can't react from Node: the round-trip to poll
    // the value and then issue a separate Stop click is slower than the
    // bar's own increments, causing it to overshoot. Detecting the
    // threshold and clicking Stop inside the same in-page callback keeps
    // the reaction within a single animation frame.
    const startButton = this.page.getByRole("button", {
      name: "Start",
      exact: true,
    });
    const stopButton = this.page.getByRole("button", {
      name: "Stop",
      exact: true,
    });
    const progressBar = this.page.locator("#progressBar");

    const [startHandle, stopHandle, barHandle] = await Promise.all([
      startButton.elementHandle() as Promise<ElementHandle<HTMLButtonElement>>,
      stopButton.elementHandle() as Promise<ElementHandle<HTMLButtonElement>>,
      progressBar.elementHandle() as Promise<ElementHandle<HTMLElement>>,
    ]);

    await this.page.evaluate(
      ({ startEl, stopEl, barEl, target }) => {
        return new Promise<void>((resolve) => {
          startEl.click();
          const check = () => {
            const value = Number(barEl.getAttribute("aria-valuenow"));
            if (value >= target) {
              stopEl.click();
              resolve();
            } else {
              requestAnimationFrame(check);
            }
          };
          requestAnimationFrame(check);
        });
      },
      { startEl: startHandle, stopEl: stopHandle, barEl: barHandle, target: targetValue },
    );
  }
}
