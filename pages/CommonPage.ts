import { Page, expect } from "@playwright/test";
import { CommonPopupLocators } from "../fixtures/locators/popup.locators";

export class CommonPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectErrorPopup(errorCode: string, expectedMessage: string) {
    const titleLocator = this.page.locator(CommonPopupLocators.title);
    const messageLocator = this.page.locator(CommonPopupLocators.message);

    await expect(titleLocator).toHaveText(`Error: ${errorCode}`);
    await expect(messageLocator).toContainText(expectedMessage);
  }
}
