import { test, expect } from "@fixtures/fixtures";
import * as path from "path";

const SAMPLE_UPLOAD_FILE = path.join(
  __dirname,
  "..",
  "test-data",
  "sample-upload.txt",
);

// Scenario (http://uitestingplayground.com/dynamicid):
// - Record button click.
// - Then execute your test to make sure that ID is not used for button
//   identification.
test(
  "Dynamic ID",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, dynamicIDPage }) => {
    await dynamicIDPage.goto();
    await expect(page).toHaveURL("/dynamicid");
    await dynamicIDPage.clickOnDynamicIdLink();
  },
);

// Scenario (http://uitestingplayground.com/classattr):
// - Record primary (blue) button click and press ok in alert popup.
// - Then execute your test to make sure that it can identify the button
//   using btn-primary class.
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

// Scenario (http://uitestingplayground.com/hiddenlayers):
// - Record button click and then duplicate the button click step in your
//   test.
// - Execute the test to make sure that green button can not be hit twice.
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

// Scenario (http://uitestingplayground.com/loaddelay):
// - Navigate to Home page and record Load Delays link click and button
//   click on this page.
// - Then play the test. It should wait until page is loaded.
test(
  "Load Delay",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, loadDelayPage }) => {
    await loadDelayPage.goto();
    await expect(page).toHaveURL("/loaddelay", { timeout: 5000 });
    await loadDelayPage.clickOnDelayButton();
  },
);

// Scenario (http://uitestingplayground.com/ajax):
// - Record the following steps. Press the button below and wait for data
//   to appear (15 seconds), click on text of the loaded label.
// - Then execute your test to make sure it waits for label text to
//   appear.
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

// Scenario (http://uitestingplayground.com/clientdelay):
// - Record the following steps. Press the button below and wait for data
//   to appear (15 seconds), click on text of the loaded label.
// - Then execute your test to make sure it waits for label text to
//   appear.
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

// Scenario (http://uitestingplayground.com/click):
// - Record button click. The button becomes green after clicking.
// - Then execute your test to make sure that it is able to click the
//   button.
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

// Scenario (http://uitestingplayground.com/textinput):
// - Record setting text into the input field and pressing the button.
// - Then execute your test to make sure that the button name is
//   changing.
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

// Scenario (http://uitestingplayground.com/scrollbars):
// - Find a button in the scroll view and record button click.
// - Update your test to automatically scroll the button into a visible
//   area.
// - Then execute your test to make sure it works.
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

// Scenario (http://uitestingplayground.com/dynamictable):
// - For Chrome process get value of CPU load.
// - Compare it with value in the yellow label.
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

// Scenario (http://uitestingplayground.com/verifytext):
// - Create a test that finds an element with Welcome... text.
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

// Scenario (http://uitestingplayground.com/progressbar):
// - Create a test that clicks Start button and then waits for the
//   progress bar to reach 75%. Then the test should click Stop. The less
//   the difference between value of the stopped progress bar and 75%
//   the better your result.
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

// Scenario (http://uitestingplayground.com/visibility):
// - Learn locators of all buttons.
// - In your testing scenario press Hide button.
// - Determine if other buttons visible or not.
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

// Description (http://uitestingplayground.com/sampleapp - no explicit
// Scenario section on this page):
// - Fill in and submit the form. For successfull login use any
//   non-empty user name and `pwd` as password.
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

// Description (http://uitestingplayground.com/sampleapp - no explicit
// Scenario section on this page):
// - Fill in and submit the form. For successfull login use any
//   non-empty user name and `pwd` as password.
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

// Scenario (http://uitestingplayground.com/mouseover):
// - Record 2 consecutive link clicks.
// - Execute the test and make sure that click count is increasing by 2.
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

// Scenario (http://uitestingplayground.com/mouseover):
// - Record 2 consecutive link clicks.
// - Execute the test and make sure that click count is increasing by 2.
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

// Scenario (http://uitestingplayground.com/nbsp):
// - Use the following xpath to find the button in your test:
//   //button[text()='My Button']
// - Notice that the XPath does not work. Change the space between 'My'
//   and 'Button' to a non-breaking space. This time the XPath should be
//   valid.
test(
  "Non-Breaking Space",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, nonBreakingSpacePage }) => {
    await nonBreakingSpacePage.goto();
    await expect(page).toHaveURL("/nbsp");
    await nonBreakingSpacePage.clickOnButton();
  },
);

// Scenario (http://uitestingplayground.com/overlapped):
// - Record setting text into the Name input field (scroll element
//   before entering the text).
// - Then execute your test to make sure that the text was entered
//   correctly.
test(
  "Overlapped Element",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, overlappedElementPage }) => {
    await overlappedElementPage.goto();
    await expect(page).toHaveURL("/overlapped");
    await overlappedElementPage.setId("test-id");
    await overlappedElementPage.setName("test-name");
  },
);

// Scenario (http://uitestingplayground.com/shadowdom):
// - Create a test that clicks on [Generate] and then on [Copy] buttons.
//   This sequence of steps generates new guid and copies it to the
//   clipboard.
// - Add an assertion step to your test to compare the value from the
//   clipboard with the value of the input field.
// - Then execute the test to make sure that the assertion step is not
//   failing.
test.describe("Shadow DOM", () => {
  // Only this test needs an HTTPS origin (for navigator.clipboard) and the
  // site's HTTPS mirror has an untrusted cert - scoped here so the rest of
  // the suite keeps using the plain-HTTP baseURL.
  test.use({ ignoreHTTPSErrors: true });

  test(
    "Shadow DOM",
    { tag: ["@smoke", "@e2e"] },
    async ({ page, shadowDOMPage, context, browserName }) => {
      // context.grantPermissions(['clipboard-read', 'clipboard-write']) is
      // Chromium-only in Playwright - Firefox and WebKit both reject those
      // permission names with "Unknown permission". Re-enable once
      // Playwright supports clipboard permissions on those browsers.
      test.skip(
        browserName !== "chromium",
        "Clipboard permissions are only supported on Chromium in Playwright",
      );

      await shadowDOMPage.goto();
      await expect(page).toHaveURL("https://uitestingplayground.com/shadowdom");
      await shadowDOMPage.clickGenerateGUID();
      await shadowDOMPage.clickCopyGUID(context);
      const clipboardValue = await shadowDOMPage.getClipboardValue();
      const generatedGUID = await shadowDOMPage.getGeneratedGUID();
      expect(generatedGUID).toBe(clipboardValue);
    },
  );
});

// Scenario (http://uitestingplayground.com/alerts):
// - Record clicks on `Alert`, `Confirm` and `Prompt` buttons. Click `OK`
//   to confirm, answer with non-default value to the prompt.
// - Then execute your test to make sure that it passes completely
//   without manual steps.
test("Alert", { tag: ["@smoke", "@e2e"] }, async ({ page, alertsPage }) => {
  await alertsPage.goto();
  await expect(page).toHaveURL("/alerts");

  const dialogs: { type: string; message: string }[] = [];
  page.on("dialog", async (dialog) => {
    dialogs.push({ type: dialog.type(), message: dialog.message() });
    await dialog.accept();
  });

  await alertsPage.clickAlertButton();
  await expect.poll(() => dialogs.length).toBe(1);

  expect(dialogs[0]).toEqual({
    type: "alert",
    message: "Today is a working day.\nOr less likely a holiday.",
  });
});

// Scenario (http://uitestingplayground.com/alerts):
// - Record clicks on `Alert`, `Confirm` and `Prompt` buttons. Click `OK`
//   to confirm, answer with non-default value to the prompt.
// - Then execute your test to make sure that it passes completely
//   without manual steps.
test("Confirm", { tag: ["@smoke", "@e2e"] }, async ({ page, alertsPage }) => {
  await alertsPage.goto();
  await expect(page).toHaveURL("/alerts");

  // Confirm triggers a second, delayed alert reporting the result, so the
  // listener must stay registered (not just page.once) to catch both.
  const dialogs: { type: string; message: string }[] = [];
  page.on("dialog", async (dialog) => {
    dialogs.push({ type: dialog.type(), message: dialog.message() });
    await dialog.accept();
  });

  await alertsPage.clickConfirmButton();
  await expect.poll(() => dialogs.length).toBe(2);

  expect(dialogs[0]).toEqual({
    type: "confirm",
    message: "Today is Friday.\nDo you agree?",
  });
  expect(dialogs[1]).toEqual({ type: "alert", message: "Yes" });
});

// Scenario (http://uitestingplayground.com/alerts):
// - Record clicks on `Alert`, `Confirm` and `Prompt` buttons. Click `OK`
//   to confirm, answer with non-default value to the prompt.
// - Then execute your test to make sure that it passes completely
//   without manual steps.
test("Prompt", { tag: ["@smoke", "@e2e"] }, async ({ page, alertsPage }) => {
  await alertsPage.goto();
  await expect(page).toHaveURL("/alerts");

  // Prompt also triggers a delayed follow-up alert with the entered value.
  const dialogs: { type: string; message: string }[] = [];
  page.on("dialog", async (dialog) => {
    dialogs.push({ type: dialog.type(), message: dialog.message() });
    if (dialog.type() === "prompt") {
      await dialog.accept("dogs");
    } else {
      await dialog.accept();
    }
  });

  await alertsPage.clickPromptButton();
  await expect.poll(() => dialogs.length).toBe(2);

  expect(dialogs[0]).toEqual({
    type: "prompt",
    message: "Choose \"cats\" or 'dogs'.\nEnter your value:",
  });
  expect(dialogs[1]).toEqual({ type: "alert", message: "User value: dogs" });
});

// Scenario (http://uitestingplayground.com/upload):
// - Attach a file via drag&drop.
// - Attach a file using `Browse files` button.
test(
  "File Upload - Drag and Drop",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, fileUploadPage }) => {
    await fileUploadPage.goto();
    await expect(page).toHaveURL("/upload");

    await fileUploadPage.uploadViaDragAndDrop(SAMPLE_UPLOAD_FILE);

    await expect(
      fileUploadPage.getUploadedFileNameText("sample-upload.txt"),
    ).toBeVisible();
    await expect(fileUploadPage.getSelectedFilesMessage()).toBeVisible();
  },
);

// Scenario (http://uitestingplayground.com/upload):
// - Attach a file via drag&drop.
// - Attach a file using `Browse files` button.
test(
  "File Upload - Browse Files",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, fileUploadPage }) => {
    await fileUploadPage.goto();
    await expect(page).toHaveURL("/upload");

    await fileUploadPage.uploadViaBrowseButton(SAMPLE_UPLOAD_FILE);

    await expect(
      fileUploadPage.getUploadedFileNameText("sample-upload.txt"),
    ).toBeVisible();
    await expect(fileUploadPage.getSelectedFilesMessage()).toBeVisible();
  },
);

// Scenario: http://uitestingplayground.com/animation
// Record `Start Animation` button click. Wait for animation to complete and record click on `Moving Target`.
// Then execute your test to make sure that when Moving Target is clicked, it's class does not contain 'spin'. The class is printed on the status label below the buttons.
test(
  "Animation",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, animatedButtonPage }) => {
    await animatedButtonPage.goto();
    await expect(page).toHaveURL("/animation");

    await animatedButtonPage.clickAnimatedButton();
    // Wait for animation to start
    await expect(await animatedButtonPage.getMovingTargetButton()).toHaveClass(
      /spin/,
    );

    // Wait for animation to complete
    await expect(
      await animatedButtonPage.getMovingTargetButton(),
    ).not.toHaveClass(/spin/, { timeout: 10_000 });

    // Click the Moving Target button and verify the status message
    await animatedButtonPage.clickMovingTargetButton();
    await expect(
      await animatedButtonPage.getAnimationCompleteMessage(),
    ).toBeVisible();
  },
);

// Scenari0: http://uitestingplayground.com/disabledinput
// Record button click. Also record text input into an edit field.
// Make a test that enters text as soon as the edit field becomes enabled.
test(
  "Disabled Input",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, disabledInputPage }) => {
    await disabledInputPage.goto();
    await expect(page).toHaveURL("/disabledinput");

    // Click the button to disable the edit field
    await disabledInputPage.clickEnableEditFieldButton();
    await expect(await disabledInputPage.getEditField()).toBeDisabled();

    // Update the value of the edit field (this will wait for the field to become enabled)
    const newValue = "New Value";
    await disabledInputPage.updateEditFieldValue(newValue);

    // Verify that the value was updated correctly
    const editField = page.getByRole("textbox", { name: "Edit Field" });
    await expect(editField).toHaveValue(newValue);

    const valueChangedMessage =
      await disabledInputPage.getValueChangedMessage();
    expect(valueChangedMessage).toBe("Value changed to: " + newValue);
  },
);

// Scenario: http://uitestingplayground.com/autowait
// Choose an element type from the combobox.
// Check the checkboxes to set the element's properties.
// Then click one of the Apply buttons to immediately apply the settings and restore interactable state of the element after a delay.
// Interact with the element in the Playground section (click, select item, enter text).
// Observe the status messages.
test(
  "Auto Wait - Button / Visible / 3s wait",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, autoWaitPage }) => {
    await autoWaitPage.goto();
    await expect(page).toHaveURL("/autowait");

    // Set the element type, checkbox and click Apply button to apply the settings
    await autoWaitPage.setElementTypeSelector("button");
    await autoWaitPage.unsetVisibleCheckbox();
    await autoWaitPage.clickApply3sButton();

    // Check that the changes have been applied and the target element is hidden
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element settings applied for 3 seconds.",
    );
    await expect(await autoWaitPage.getTargetControl()).toBeHidden();

    // Check that the changes are reverted after the expected time has expired and the target element is visible again
    await expect(await autoWaitPage.getTargetControl()).toBeVisible({
      timeout: 4000,
    });
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element state restored.",
    );

    // Click the control
    await autoWaitPage.clickTargetButton();
    expect(await autoWaitPage.getStatusMessage()).toBe("Target clicked.");
  },
);

test(
  "Auto Wait - Input / Enabled / 5s wait",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, autoWaitPage }) => {
    await autoWaitPage.goto();
    await expect(page).toHaveURL("/autowait");

    // Set the element type, checkbox and click Apply button to apply the settings
    await autoWaitPage.setElementTypeSelector("input");
    await autoWaitPage.unsetEnabledCheckbox();
    await autoWaitPage.clickApply5sButton();

    // Check that the changes have been applied and the target element is hidden
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element settings applied for 5 seconds.",
    );
    await expect(await autoWaitPage.getTargetControl()).toBeDisabled();

    // Check that the changes are reverted after the expected time has expired and the target element is visible again
    await expect(await autoWaitPage.getTargetControl()).toBeEnabled({
      timeout: 6000,
    });
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element state restored.",
    );

    // Click the control
    await autoWaitPage.setInputText("test");

    expect(await autoWaitPage.getStatusMessage()).toBe("Text: test");
  },
);

test(
  "Auto Wait - TextArea / Editable / 10s wait",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, autoWaitPage }) => {
    await autoWaitPage.goto();
    await expect(page).toHaveURL("/autowait");

    // Set the element type, checkbox and click Apply button to apply the settings
    await autoWaitPage.setElementTypeSelector("Textarea");
    await autoWaitPage.unsetEditableCheckbox();
    await autoWaitPage.clickApply10sButton();

    // Check that the changes have been applied and the target element is hidden
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element settings applied for 10 seconds.",
    );
    await expect(await autoWaitPage.getTargetControl()).not.toBeEditable();

    // Check that the changes are reverted after the expected time has expired and the target element is visible again
    await expect(await autoWaitPage.getTargetControl()).toBeEditable({
      timeout: 11000,
    });
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element state restored.",
    );

    // Click the control
    await autoWaitPage.setInputTextArea("test");

    expect(await autoWaitPage.getStatusMessage()).toBe("Text: test");
  },
);

test(
  "Auto Wait - Select / On Top / 3s wait",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, autoWaitPage }) => {
    await autoWaitPage.goto();
    await expect(page).toHaveURL("/autowait");

    // Set the element type, checkbox and click Apply button to apply the settings
    await autoWaitPage.setElementTypeSelector("Select");
    await autoWaitPage.unsetOnTopCheckbox();
    await autoWaitPage.clickApply3sButton();

    // Check that the changes have been applied and the target element is covered by the overlay
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element settings applied for 3 seconds.",
    );
    await expect(await autoWaitPage.getTargetControl()).toBeVisible();
    expect(await autoWaitPage.isTargetOnTop()).toBe(false);

    // Check that the changes are reverted after the expected time has expired and the target element is on top again
    await expect
      .poll(() => autoWaitPage.isTargetOnTop(), { timeout: 4000 })
      .toBe(true);
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element state restored.",
    );

    // Click the control
    await autoWaitPage.setTargetSelector("Item 2");

    expect(await autoWaitPage.getStatusMessage()).toBe("Selected: Item 2");
  },
);

test(
  "Auto Wait - Label / Non Zero Size / 3s wait",
  { tag: ["@smoke", "@e2e"] },
  async ({ page, autoWaitPage }) => {
    await autoWaitPage.goto();
    await expect(page).toHaveURL("/autowait");

    // Set the element type, checkbox and click Apply button to apply the settings
    await autoWaitPage.setElementTypeSelector("Label");
    await autoWaitPage.unsetNonZeroSizeCheckbox();
    await autoWaitPage.clickApply3sButton();

    // Check that the changes have been applied and the target element is hidden
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element settings applied for 3 seconds.",
    );
    await expect(await autoWaitPage.getTargetControl()).toBeHidden();

    // Check that the changes are reverted after the expected time has expired and the target element is visible again
    await expect(await autoWaitPage.getTargetControl()).toBeVisible({
      timeout: 4000,
    });
    expect(await autoWaitPage.getStatusMessage()).toBe(
      "Target element state restored.",
    );

    // Click the control
    await autoWaitPage.clickTargetLabel();
    expect(await autoWaitPage.getStatusMessage()).toBe("Target clicked.");
  },
);
