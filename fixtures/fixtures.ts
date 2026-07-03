import { test as base, expect } from "@playwright/test";
import { DynamicIDPage } from "@pages/DynamicIDPage";
import { ClassAttributePage } from "@pages/ClassAttributePage";
import { HiddenLayersPage } from "@pages/HiddenLayersPage";
import { LoadDelayPage } from "@pages/LoadDelayPage";
import { AjaxDataPage } from "@pages/AJAXDataPage";
import { ClientSideDelayPage } from "@pages/ClientSideDelayPage";
import { PhysicalClickPage } from "@pages/PhysicalClickPage";
import { TextInputPage } from "@pages/TextInputPage";
import { ScrollBarsPage } from "@pages/ScrollBarsPage";
import { DynamicTablePage } from "@pages/DynamicTablePage";
import { VerifyTextPage } from "@pages/VerifyTextPage";
import { ProgressBarPage } from "@pages/ProgressBarPage";
import { VisibilityPage } from "@pages/VisibilityPage";
import { SampleAppPage } from "@pages/SampleAppPage";
import { MouseOverPage } from "@pages/MouseOverPage";
import { NonBreakingSpacePage } from "@pages/NonBreakingSpacePage";
import { OverlappedElementPage } from "@pages/OverlappedElementPage";
import { ShadowDOMPage } from "@pages/ShadowDOMPage";
import { AlertsPage } from "@pages/AlertsPage";

// Pattern for blocking ad domains in smoke runs (where real-site ads can
// inject markup that breaks locators). Expand AD_DOMAIN_PATTERN to match
// the ad networks the target app loads.
const AD_DOMAIN_PATTERN = /\.(doubleclick|googlesyndication|adnxs)\.com/;

type Fixtures = {
  blockAdDomains: void;
  // Add page objects here as they're created:
  // homePage: HomePage;
  dynamicIDPage: DynamicIDPage;
  classAttributePage: ClassAttributePage;
  hiddenLayersPage: HiddenLayersPage;
  loadDelayPage: LoadDelayPage;
  ajaxDataPage: AjaxDataPage;
  clientSideDelayPage: ClientSideDelayPage;
  physicalClickPage: PhysicalClickPage;
  textInputPage: TextInputPage;
  scrollBarsPage: ScrollBarsPage;
  dynamicTablePage: DynamicTablePage;
  verifyTextPage: VerifyTextPage;
  progressBarPage: ProgressBarPage;
  visibilityPage: VisibilityPage;
  sampleAppPage: SampleAppPage;
  mouseOverPage: MouseOverPage;
  nonBreakingSpacePage: NonBreakingSpacePage;
  overlappedElementPage: OverlappedElementPage;
  shadowDOMPage: ShadowDOMPage;
  alertsPage: AlertsPage;
};

export const test = base.extend<Fixtures>({
  blockAdDomains: [
    async ({ page }, use) => {
      if (process.env.TEST_SUITE !== "e2e") {
        await page.route(AD_DOMAIN_PATTERN, (route) => route.abort());
      }
      await use();
    },
    { auto: true },
  ],
  dynamicIDPage: async ({ page }, use) => use(new DynamicIDPage(page)),
  classAttributePage: async ({ page }, use) =>
    use(new ClassAttributePage(page)),
  hiddenLayersPage: async ({ page }, use) => use(new HiddenLayersPage(page)),
  loadDelayPage: async ({ page }, use) => use(new LoadDelayPage(page)),
  ajaxDataPage: async ({ page }, use) => use(new AjaxDataPage(page)),
  clientSideDelayPage: async ({ page }, use) =>
    use(new ClientSideDelayPage(page)),
  physicalClickPage: async ({ page }, use) => use(new PhysicalClickPage(page)),
  textInputPage: async ({ page }, use) => use(new TextInputPage(page)),
  scrollBarsPage: async ({ page }, use) => use(new ScrollBarsPage(page)),
  dynamicTablePage: async ({ page }, use) => use(new DynamicTablePage(page)),
  verifyTextPage: async ({ page }, use) => use(new VerifyTextPage(page)),
  progressBarPage: async ({ page }, use) => use(new ProgressBarPage(page)),
  visibilityPage: async ({ page }, use) => use(new VisibilityPage(page)),
  sampleAppPage: async ({ page }, use) => use(new SampleAppPage(page)),
  mouseOverPage: async ({ page }, use) => use(new MouseOverPage(page)),
  nonBreakingSpacePage: async ({ page }, use) =>
    use(new NonBreakingSpacePage(page)),
  overlappedElementPage: async ({ page }, use) =>
    use(new OverlappedElementPage(page)),
  shadowDOMPage: async ({ page }, use) => use(new ShadowDOMPage(page)),
  alertsPage: async ({ page }, use) => use(new AlertsPage(page)),
});

export { expect };
