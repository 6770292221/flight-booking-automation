import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CommonPage } from "../pages/CommonPage";

test.describe("Login - Success Flow", () => {
  test("TC_LOGIN_01: Login with valid email, password, and OTP @smoke @regression", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.login("aphirak_2008@hotmail.com", "Com@sci54");
    await login.confirmOtp("123456");
    await login.expectLoginSuccess("imaikungki");
  });
});

test.describe("Login - Validation Errors", () => {
  test("TC_LOGIN_02: Login with empty email @regression", async ({ page }) => {
    const login = new LoginPage(page);
    const commonPage = new CommonPage(page);

    await login.navigate();
    await login.login("", "Com@sci54");
    await commonPage.expectErrorPopup(
      "LGN_2002",
      "Missing required information: flightId, email, password and otp are mandatory."
    );
  });

  test("TC_LOGIN_03: Login with empty password @regression", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const commonPage = new CommonPage(page);

    await login.navigate();
    await login.login("validuser@mail.com", "");
    await commonPage.expectErrorPopup(
      "LGN_2002",
      "Missing required information: flightId, email, password and otp are mandatory."
    );
  });

  test("TC_LOGIN_04: Login with incorrect email/password @regression", async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const commonPage = new CommonPage(page);

    await login.navigate();
    await login.login("wrong@mail.com", "wrong123");
    await commonPage.expectErrorPopup(
      "LGN_2003",
      "The email you entered is incorrect. Please try again."
    );
  });
});

test.describe("Login - OTP Verification", () => {
  test("TC_LOGIN_06: Login with invalid OTP @regression", async ({ page }) => {
    const login = new LoginPage(page);
    const commonPage = new CommonPage(page);

    await login.navigate();
    await login.login("aphirak_2008@hotmail.com", "Com@sci54");
    await login.confirmOtp("000000");
    await commonPage.expectErrorPopup(
      "OTP_1002",
      "Invalid OTP. Please try again."
    );
  });
});

test.describe("Login - Social Login", () => {
  test("TC_LOGIN_05: Click Google login button @regression", async ({
    page,
  }) => {
    const login = new LoginPage(page);

    await login.navigate();
    await login.clickGoogleLogin();
    await expect(page).toHaveURL(/accounts\.google\.com/);
    await expect(page.url()).toContain("accounts.google.com");
  });
});
