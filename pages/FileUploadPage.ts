import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import * as fs from "fs";
import * as path from "path";

export class FileUploadPage extends BasePage {
  readonly path: string | RegExp;
  constructor(page: Page) {
    super(page);
    this.path = "/upload";
  }

  // <iframe src="/static/upload.html" width="800" height="500" frameborder="0"></iframe>
  private getUploadFrame() {
    return this.page.frameLocator("iframe");
  }

  // <iframe src="/static/upload.html">
  //   #document
  //     <label for="browse" class="browse-btn">Browse files</label>
  async uploadViaBrowseButton(filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.getUploadFrame().getByText("Browse files", { exact: true }).click(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  // <iframe src="/static/upload.html">
  //   #document
  //     <div class="document-uploader upload-box">...</div>
  async uploadViaDragAndDrop(filePath: string) {
    // Real OS-level drag-and-drop can't be simulated by Playwright, so this
    // builds an in-page DataTransfer carrying the file's actual bytes and
    // dispatches it as a "drop" event on the widget's root element - the
    // documented approach for testing HTML5 drag-and-drop file uploads.
    // The DataTransfer/File objects must be created inside the upload
    // widget's own iframe context, not the top-level page, or dispatching
    // the event on the frame's locator fails with a cross-context error.
    const uploadFrame = this.page
      .frames()
      .find((frame) => frame.url().endsWith("/static/upload.html"));
    if (!uploadFrame) {
      throw new Error("Could not find the file upload widget's iframe");
    }

    const fileName = path.basename(filePath);
    const fileContents = fs.readFileSync(filePath).toString("base64");

    const dataTransfer = await uploadFrame.evaluateHandle(
      ({ base64, fileName }) => {
        const byteString = atob(base64);
        const bytes = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          bytes[i] = byteString.charCodeAt(i);
        }
        const file = new File([bytes], fileName);
        const transfer = new DataTransfer();
        transfer.items.add(file);
        return transfer;
      },
      { base64: fileContents, fileName },
    );

    await this.getUploadFrame()
      .locator(".document-uploader.upload-box")
      .dispatchEvent("drop", { dataTransfer });
  }

  // <iframe src="/static/upload.html">
  //   #document
  //     <p>sample-upload.txt</p>
  getUploadedFileNameText(fileName: string) {
    return this.getUploadFrame().getByText(fileName, { exact: true });
  }

  // <iframe src="/static/upload.html">
  //   #document
  //     <p>1 file(s) selected</p>
  getSelectedFilesMessage() {
    return this.getUploadFrame().getByText("1 file(s) selected", {
      exact: true,
    });
  }
}
