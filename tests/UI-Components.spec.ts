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
  "Physical Click",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, physicalClickPage, browserName }) => {
    // The site's click handler only accepts the click if event.screenX > 0.
    // Confirmed via a standalone script that Playwright's WebKit driver never
    // populates MouseEvent.screenX for automated input (locator.click(),
    // headed, and raw page.mouse.down()/up() all report screenX 0), so this
    // is unwinnable in WebKit regardless of click method. Re-enable once
    // Playwright's WebKit driver reports real screen coordinates.
    test.skip(
      browserName === "webkit",
      "WebKit never reports MouseEvent.screenX for automated clicks",
    );

    await physicalClickPage.goto();
    await expect(page).toHaveURL("/click");
    const wasClicked = await physicalClickPage.clickPysicalButton();
    expect(wasClicked).toBe(true);
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

test(
  "Visibility",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, visibilityPage }) => {
    await visibilityPage.goto();
    await expect(page).toHaveURL("/visibility");

    const removedButton = await visibilityPage.getRemovedButton();
    const zeroWidthButton = await visibilityPage.getZeroWidthButton();
    const overlappedButton = await visibilityPage.getOverlappedButton();
    const transparentButton = await visibilityPage.getTransparentButton();
    const visibilityHiddenButton =
      await visibilityPage.getVisibilityHiddenButton();
    const notDisplayedButton = await visibilityPage.getNotDisplayedButton();
    const offscreenButton = await visibilityPage.getOffscreenButton();

    expect(await visibilityPage.isActuallyVisible(removedButton)).toBe(true);
    expect(await visibilityPage.isActuallyVisible(zeroWidthButton)).toBe(true);
    expect(await visibilityPage.isActuallyVisible(overlappedButton)).toBe(true);
    expect(await visibilityPage.isActuallyVisible(transparentButton)).toBe(
      true,
    );
    expect(await visibilityPage.isActuallyVisible(visibilityHiddenButton)).toBe(
      true,
    );
    expect(await visibilityPage.isActuallyVisible(notDisplayedButton)).toBe(
      true,
    );
    expect(await visibilityPage.isActuallyVisible(offscreenButton)).toBe(true);

    await visibilityPage.clickHideButton();

    expect(await visibilityPage.isActuallyVisible(removedButton)).toBe(false);
    expect(await visibilityPage.isActuallyVisible(zeroWidthButton)).toBe(false);
    expect(await visibilityPage.isActuallyVisible(overlappedButton)).toBe(
      false,
    );
    expect(await visibilityPage.isActuallyVisible(transparentButton)).toBe(
      false,
    );
    expect(await visibilityPage.isActuallyVisible(visibilityHiddenButton)).toBe(
      false,
    );
    expect(await visibilityPage.isActuallyVisible(notDisplayedButton)).toBe(
      false,
    );
    expect(await visibilityPage.isActuallyVisible(offscreenButton)).toBe(false);
  },
);

test(
  "Sample App - Successful Login",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, sampleAppPage }) => {
    await sampleAppPage.goto();
    await expect(page).toHaveURL("/sampleapp");
    await sampleAppPage.setUserName("testuser");
    await sampleAppPage.setPassword("pwd");
    await sampleAppPage.clickLogInButton();
    const loginMessage = (
      await (await sampleAppPage.getLoginMessage()).innerText()
    ).trim();
    expect(loginMessage).toBe("Welcome, testuser!");
  },
);

test(
  "Sample App - Failed Login",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, sampleAppPage }) => {
    await sampleAppPage.goto();
    await expect(page).toHaveURL("/sampleapp");
    await sampleAppPage.setUserName("wronguser");
    await sampleAppPage.setPassword("wrongpwd");
    await sampleAppPage.clickLogInButton();
    const loginErrorMessage = (
      await (await sampleAppPage.getLoginErrorMessage()).innerText()
    ).trim();
    expect(loginErrorMessage).toBe("Invalid username/password");
  },
);

test(
  "Mouse Over - Click me",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, mouseOverPage }) => {
    await mouseOverPage.goto();
    await expect(page).toHaveURL("/mouseover");
    await mouseOverPage.clickClickMeLink();
    await mouseOverPage.clickClickMeLink();
    const clickMeClicks = await mouseOverPage.getClickMeClicks();
    expect(clickMeClicks).toBe("2");
  },
);

test(
  "Mouse Over - Link Button",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, mouseOverPage }) => {
    await mouseOverPage.goto();
    await expect(page).toHaveURL("/mouseover");
    await mouseOverPage.clickLinkButton();
    await mouseOverPage.clickLinkButton();
    const clickButtonClicks = await mouseOverPage.getClickButtonClicks();
    expect(clickButtonClicks).toBe("2");
  },
);

test(
  "Non-Breaking Space",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, nonBreakingSpacePage }) => {
    await nonBreakingSpacePage.goto();
    await expect(page).toHaveURL("/nbsp");
    await nonBreakingSpacePage.clickOnButton();
  },
);
