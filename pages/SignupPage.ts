import { Page, Locator, expect } from "@playwright/test";
import { SignupPageLocators } from "../fixtures/locators/signup.page";

export class SignupPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly phone: Locator;
  readonly password: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId(SignupPageLocators.firstName);
    this.lastName = page.getByTestId(SignupPageLocators.lastName);
    this.email = page.getByTestId(SignupPageLocators.email);
    this.phone = page.getByTestId(SignupPageLocators.phone);
    this.password = page.getByTestId(SignupPageLocators.password);
    this.registerBtn = page.getByTestId(SignupPageLocators.registerBtn);
  }

  async navigate() {
    await this.page.goto("/register");
  }

  async registerUser({
    firstName,
    lastName,
    email,
    phone,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.phone.fill(phone);
    await this.password.fill(password);
    await this.registerBtn.click();
  }

  async expectSuccessPopupMessage() {
    await expect(
      this.page.getByRole("heading", { name: SignupPageLocators.popupTitle })
    ).toBeVisible();

    await expect(
      this.page.getByText(SignupPageLocators.popupDescription, { exact: true })
    ).toBeVisible();
  }

  async clickSuccessPopupOkButton() {
    await this.page.locator(SignupPageLocators.confirmButton).click();
  }
}
