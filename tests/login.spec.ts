import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { CommonPage } from "@pages/CommonPage";
import { getOtpByUserId } from "@utils/redis/getEmailOtp";

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
      const userId = "6804a760601850de6fc4ede9";
      const email = "aphirak_2008@hotmail.com";
      const password = "Com@sci54";

      await login.login(email, password);

      const otp = await getOtpByUserId(userId);
      console.log("OTP =", otp);

      await login.confirmOtp(otp!);
      await login.expectLoginSuccess("imaikungki");
    });
  });

  test.describe("Validation Errors", () => {
    test("TC_LOGIN_02: Login with empty email @regression", async () => {
      await login.login("", "Com@sci54");
      await commonPage.expectErrorPopup(
        "LGN_2002",
        "Missing required information: flightId, email, password and otp are mandatory."
      );
    });

    test("TC_LOGIN_03: Login with empty password @regression", async () => {
      await login.login("validuser@mail.com", "");
      await commonPage.expectErrorPopup(
        "LGN_2002",
        "Missing required information: flightId, email, password and otp are mandatory."
      );
    });

    test("TC_LOGIN_04: Login with incorrect email/password @regression", async () => {
      await login.login("wrong@mail.com", "wrong123");
      await commonPage.expectErrorPopup(
        "LGN_2003",
        "The email you entered is incorrect. Please try again."
      );
    });
  });

  test.describe("OTP Verification", () => {
    test("TC_LOGIN_06: Login with invalid OTP @regression", async () => {
      await login.login("aphirak_2008@hotmail.com", "Com@sci54");
      await login.confirmOtp("000000");
      await commonPage.expectErrorPopup(
        "OTP_1002",
        "Invalid OTP. Please try again."
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
