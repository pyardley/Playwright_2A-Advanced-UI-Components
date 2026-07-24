import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DynamicTablePage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/dynamictable";
  }

  // <div role="table" aria-label="Tasks" aria-describedby="table_desc">
  //   <div role="rowgroup">
  //     <div role="row"><span role="columnheader">Name</span>...<span role="columnheader">CPU</span>...</div>
  //     <div role="row"><span role="cell">Chrome</span>...<span role="cell">6.1%</span>...</div>
  async getChromeCPUValue() {
    // 1. Find all column headers and look for the one named "CPU"
    const headers = this.page.getByRole("columnheader");
    const headerTexts = await headers.allTextContents();
    const cpuColumnIndex = headerTexts.indexOf("CPU");

    if (cpuColumnIndex === -1) {
      throw new Error('Could not find the "CPU" column header.');
    }

    // 2. Locate the row that contains the text "Chrome"
    const chromeRow = this.page.getByRole("row").filter({
      has: this.page.getByRole("cell", { name: "Chrome", exact: true }),
    });

    // 3. Target the cell in the Chrome row that matches the CPU column's index
    const cpuCell = chromeRow.getByRole("cell").nth(cpuColumnIndex);

    // 4. Extract and use the text content
    return await cpuCell.textContent();
  }

  // <p class="bg-warning">Chrome CPU: 6.1%</p>
  async getExpectedValueForChromeCPU() {
    const cpuText = await (
      await this.page.locator("p.bg-warning").innerText()
    ).trim();
    return cpuText.replace("Chrome CPU: ", "");
  }
}
