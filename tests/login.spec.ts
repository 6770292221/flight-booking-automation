import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { CommonPage } from "@pages/CommonPage";
import { getOtpByUserId } from "@utils/redis/getEmailOtp";
import { LoginExpectedResult } from "@fixtures/expectedResult/login.expect";

// (global scope ใน test file)
const USER_EMAIL = process.env.USER_EMAIL!;
const USER_PASSWORD = process.env.USER_PASSWORD!;
const USER_ID = process.env.USER_ID!;
const USER_DISPLAY_NAME = process.env.USER_DISPLAY_NAME!;

let login: LoginPage;
let commonPage: CommonPage;

test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    commonPage = new CommonPage(page);
    await login.navigate();
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Completed: ${testInfo.title}`);
  });

  test.describe("Success Flow", () => {
    test("TC_LOGIN_01: Login with valid email, password, and OTP @smoke @regression", async () => {
      await login.login(USER_EMAIL, USER_PASSWORD!);
      const otp = await getOtpByUserId(USER_ID);
      console.log("OTP =", otp);

      await login.confirmOtp(otp!);
      await login.expectLoginSuccess(USER_DISPLAY_NAME);
    });
  });

  test.describe("Validation Errors", () => {
    test("TC_LOGIN_02: Login with empty email @regression", async () => {
      await login.login("", "Com@sci54");
      await commonPage.expectErrorPopup(
        LoginExpectedResult.MISSING_FIELDS.code,
        LoginExpectedResult.MISSING_FIELDS.message
      );
    });

    test("TC_LOGIN_03: Login with empty password @regression", async () => {
      await login.login("validuser@mail.com", "");
      await commonPage.expectErrorPopup(
        LoginExpectedResult.MISSING_FIELDS.code,
        LoginExpectedResult.MISSING_FIELDS.message
      );
    });

    test("TC_LOGIN_04: Login with incorrect email/password @regression", async () => {
      await login.login("wrong@mail.com", "wrong123");
      await commonPage.expectErrorPopup(
        LoginExpectedResult.INVALID_CREDENTIALS.code,
        LoginExpectedResult.INVALID_CREDENTIALS.message
      );
    });
  });

  test.describe("OTP Verification", () => {
    test("TC_LOGIN_06: Login with invalid OTP @regression", async () => {
      await login.login("aphirak_2008@hotmail.com", "Com@sci54");
      await login.confirmOtp("000000");
      await commonPage.expectErrorPopup(
        LoginExpectedResult.INVALID_OTP.code,
        LoginExpectedResult.INVALID_OTP.message
      );
    });
  });

  test.describe("Social Login", () => {
    test("TC_LOGIN_05: Click Google login button @regression", async () => {
      await login.clickGoogleLogin();
      await expect(login.page).toHaveURL(/accounts\.google\.com/);
      await expect(login.page.url()).toContain("accounts.google.com");
    });
  });
});
