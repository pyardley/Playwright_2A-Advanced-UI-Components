import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class FramesPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/frames";
  }

  // <iframe id="frame-outer" name="frame-outer" title="Outer Frame">
  async getFrame1() {
    return this.page.frameLocator("#frame-outer");
  }

  // <iframe id="frame-outer">
  //   #document
  //     <iframe id="frame-inner" name="frame-inner" title="Inner Frame">
  async getFrame2() {
    return (await this.getFrame1()).frameLocator("#frame-inner");
  }

  // <iframe id="frame-outer">
  //   #document
  //     <button data-action="edit" onclick="showResult('Edit')">Edit</button>
  async clickOuterEditButton() {
    await (await this.getFrame1())
      .getByRole("button", { name: "Edit" })
      .click();
  }

  // <iframe id="frame-outer">
  //   #document
  //     <button onclick="showResult('Submit')">Submit</button>
  async clickOuterSubmitButton() {
    await (await this.getFrame1())
      .getByRole("button", { name: "Submit" })
      .click();
  }

  // <iframe id="frame-outer">
  //   #document
  //     <div id="result"></div>
  async getOuterMessage() {
    return (
      await (await this.getFrame1()).locator("#result").innerText()
    ).trim();
  }

  // <iframe id="frame-outer">
  //   #document
  //     <iframe id="frame-inner">
  //       #document
  //         <button data-action="edit" onclick="showResult('Edit')">Edit</button>
  async clickInnerEditButton() {
    await (await this.getFrame2())
      .getByRole("button", { name: "Edit" })
      .click();
  }

  // <iframe id="frame-outer">
  //   #document
  //     <iframe id="frame-inner">
  //       #document
  //         <button onclick="showResult('Submit')">Submit</button>
  async clickInnerSubmitButton() {
    await (await this.getFrame2())
      .getByRole("button", { name: "Submit" })
      .click();
  }

  // <iframe id="frame-outer">
  //   #document
  //     <iframe id="frame-inner">
  //       #document
  //         <div id="result"></div>
  async getInnerMessage() {
    return (
      await (await this.getFrame2()).locator("#result").innerText()
    ).trim();
  }
}
