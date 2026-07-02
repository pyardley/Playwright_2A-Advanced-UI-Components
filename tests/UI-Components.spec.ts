import { test, expect } from "@fixtures/fixtures";

test(
  "Dynamic ID",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, dynamicIDPage }) => {
    await dynamicIDPage.goto();
    await expect(page).toHaveURL("/dynamicid");
    await dynamicIDPage.clickOnDynamicIdLink();
  },
);

test(
  "Class Attribute",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, classAttributePage }) => {
    await classAttributePage.goto();
    await expect(page).toHaveURL("/classattr");
    page.once("dialog", (dialog) => dialog.accept());
    await classAttributePage.clickOnBlueButton();
  },
);

test(
  "Hidden Layers",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, hiddenLayersPage }) => {
    await hiddenLayersPage.goto();
    await expect(page).toHaveURL("/hiddenlayers");
    // First press expected to work
    const wasClicked = await hiddenLayersPage.clickOnGreenButton();
    expect(wasClicked).toBe(true);

    // Second press expected to fail
    const wasClickedAgain = await hiddenLayersPage.clickOnGreenButton();
    expect(wasClickedAgain).toBe(false);
  },
);

test(
  "Load Delay",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, loadDelayPage }) => {
    await loadDelayPage.goto();
    await expect(page).toHaveURL("/loaddelay", { timeout: 5000 });
    await loadDelayPage.clickOnDelayButton();
  },
);

test(
  "AJAX Data",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, ajaxDataPage }) => {
    await ajaxDataPage.goto();
    await expect(page).toHaveURL("/ajax");
    await ajaxDataPage.clickOnAjaxButton();
    await expect(await ajaxDataPage.getAjaxContent()).toBeVisible();
  },
);

test(
  "Client Side Delay",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, clientSideDelayPage }) => {
    await clientSideDelayPage.goto();
    await expect(page).toHaveURL("/clientdelay");
    await clientSideDelayPage.clickOnClientSideDelayButton();
    await expect(
      await clientSideDelayPage.getClientSideDelayContent(),
    ).toBeVisible();
  },
);

test(
  "Text Input",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, textInputPage }) => {
    await textInputPage.goto();
    await expect(page).toHaveURL("/textinput");
    await textInputPage.fillTextInputField("New Button Name");
    const buttonText = await textInputPage.clickPysicalButton();
    expect(buttonText).toBe("New Button Name");
  },
);

test(
  "Scroll Bars",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, scrollBarsPage }) => {
    await scrollBarsPage.goto();
    await expect(page).toHaveURL("/scrollbars");
    //await scrollBarsPage.scrollToBottom();
    //await scrollBarsPage.scrollToTop();
    await scrollBarsPage.clickButton();
  },
);

test(
  "Dynamic Table",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, dynamicTablePage }) => {
    await dynamicTablePage.goto();
    await expect(page).toHaveURL("/dynamictable");
    const chromeCPUValue = await dynamicTablePage.getChromeCPUValue();
    const expectedValue = await dynamicTablePage.getExpectedValueForChromeCPU();
    expect(chromeCPUValue).toBe(expectedValue);
  },
);

test(
  "Verify Text",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, verifyTextPage }) => {
    await verifyTextPage.goto();
    await expect(page).toHaveURL("/verifytext");
    const welcomeText = await verifyTextPage.getWelcomeText();
    expect(welcomeText).toBe("Welcome UserName!");
  },
);

test(
  "Progress Bar",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, progressBarPage }) => {
    await progressBarPage.goto();
    await expect(page).toHaveURL("/progressbar");
    await progressBarPage.waitForProgressBarToReachValue(75);
    const progressBarValue = await progressBarPage.getProgressBarValue();
    expect(Math.abs(progressBarValue - 75)).toBeLessThanOrEqual(1); // Allow for a small margin of error
  },
);
