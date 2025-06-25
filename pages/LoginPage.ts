// pages/LoginPage.ts
import { Page, Locator, expect } from "@playwright/test";
import { LoginPageLocators } from "../fixtures/locators/login.page";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly googleLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId(LoginPageLocators.email);
    this.passwordInput = page.getByTestId(LoginPageLocators.password);
    this.loginButton = page.getByTestId(LoginPageLocators.loginButton).nth(1);
    this.googleLoginButton = page.getByTestId(
      LoginPageLocators.googleLoginButton
    );
  }

  async navigate() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clickGoogleLogin() {
    await this.googleLoginButton.click();
  }

  async confirmOtp(code: string) {
    await expect(
      this.page.getByRole("heading", { name: LoginPageLocators.otpHeading })
    ).toBeVisible();

    await this.page.getByTestId(LoginPageLocators.otpInput).fill(code);
    await this.page.getByTestId(LoginPageLocators.otpConfirmButton).click();
  }

  async expectLoginSuccess(userDisplayName: string) {
    const userDropdown = this.page.getByTestId(LoginPageLocators.userDropdown);

    await expect(userDropdown).toBeVisible();
    await expect(userDropdown).toHaveText(userDisplayName);
  }
}
