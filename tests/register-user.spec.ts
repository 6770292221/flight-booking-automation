import { test } from "@playwright/test";
import { SignupPage } from "@pages/SignupPage";
import { CommonPage } from "@pages/CommonPage";
import { deleteUserByEmail } from "@utils/mongo/deleteUserByEmail";
import { RegisterExpectedResult } from "@fixtures/expectedResult/register.expect";
import { RegisterTestdata } from "@fixtures/testData/register.testdata";

let signup: SignupPage;
let commonPage: CommonPage;
let email: string;

test.describe("Register Tests", () => {
  test.beforeEach(async ({ page }) => {
    email = "test@example.com";
    signup = new SignupPage(page);
    commonPage = new CommonPage(page);
    await signup.navigate();
  });

  test.afterEach(async ({}, testInfo) => {
    await deleteUserByEmail(RegisterTestdata.VALID.email);
    console.log(`Completed: ${testInfo.title}`);
  });

  test.describe("Success Cases", () => {
    test("TC_REG_01: Register with valid data @regression @smoke", async () => {
      await signup.registerUser(RegisterTestdata.VALID);
      await signup.expectSuccessPopupMessage();
      await signup.clickSuccessPopupOkButton();
    });
  });

  test.describe("Fail Cases", () => {
    test("TC_REG_02: Email already used @regression", async () => {
      const { code, message } = RegisterExpectedResult.DUPLICATE_EMAIL;
      await signup.registerUser(RegisterTestdata.DUPLICATE_EMAIL);
      await commonPage.expectErrorPopup(code, message);
    });

    test("TC_REG_03: Weak password format @regression", async () => {
      const email = `weakpass${Date.now()}@example.com`;
      const { code, message } = RegisterExpectedResult.WEAK_PASSWORD;
      await signup.registerUser(RegisterTestdata.WEAK_PASSWORD(email));
      await commonPage.expectErrorPopup(code, message);
    });

    test("TC_REG_04: Invalid phone format @regression", async () => {
      const invalidPhone = "0814939873344343434343";
      const { code, message } =
        RegisterExpectedResult.INVALID_FORMAT(invalidPhone);

      await signup.registerUser(
        RegisterTestdata.INVALID_PHONE(
          `phone${Date.now()}@mail.com`,
          invalidPhone
        )
      );

      await commonPage.expectErrorPopup(code, message);
    });

    test("TC_REG_05: Invalid first name @regression", async () => {
      const invalidName = "John123";
      const { code, message } =
        RegisterExpectedResult.INVALID_FORMAT(invalidName);

      await signup.registerUser(
        RegisterTestdata.INVALID_PHONE(
          `phone${Date.now()}@mail.com`,
          invalidName
        )
      );

      await commonPage.expectErrorPopup(code, message);
    });

    test("TC_REG_06: Invalid last name @regression", async () => {
      const invalidLastName = "Smith123!";
      const { code, message } =
        RegisterExpectedResult.INVALID_FORMAT(invalidLastName);

      await signup.registerUser(
        RegisterTestdata.INVALID_PHONE(
          `phone${Date.now()}@mail.com`,
          invalidLastName
        )
      );

      await commonPage.expectErrorPopup(code, message);
    });
  });
});
