import { test } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";
import { CommonPage } from "../pages/CommonPage";

let signup: SignupPage;
let commonPage: CommonPage;

test.describe("Register Tests", () => {
  test.beforeEach(async ({ page }) => {
    signup = new SignupPage(page);
    commonPage = new CommonPage(page);
    await signup.navigate();
  });

  test.afterEach(async ({}, testInfo) => {
    console.log(`Completed: ${testInfo.title}`);
  });

  test.describe("Success Cases", () => {
    test("TC_REG_01: Register with valid data @regression @smoke", async () => {
      const email = `test${Date.now()}@example.com`;

      await signup.registerUser({
        firstName: "Test",
        lastName: "User",
        email,
        phone: "0812345678",
        password: "Com@sci54",
      });

      await signup.expectSuccessPopupMessage();
      await signup.clickSuccessPopupOkButton();
    });
  });

  test.describe("Fail Cases", () => {
    test("TC_REG_02: Email already used @regression", async () => {
      await signup.registerUser({
        firstName: "Any",
        lastName: "Name",
        email: "maicomsci54@gmail.com",
        phone: "0812345678",
        password: "Com@sci54",
      });

      await commonPage.expectErrorPopup(
        "REG_1005",
        "Email Already Exists: The email already exists in the system."
      );
    });

    test("TC_REG_03: Weak password format @regression", async () => {
      const email = `weakpass${Date.now()}@example.com`;

      await signup.registerUser({
        firstName: "Weak",
        lastName: "Password",
        email,
        phone: "0812345678",
        password: "abc123",
      });

      await commonPage.expectErrorPopup(
        "REG_1006",
        `Password must meet the following requirements: 1. Length between 8 and 20 characters, 2. At 
least one uppercase letter (A-Z), 3. At least one lowercase letter (a-z), 4. At
least one number (0-9), 5. At least 
one special character (e.g., !@#$%^&*(),.?":{}|<>).`
      );
    });

    test("TC_REG_04: Invalid phone format @regression", async () => {
      const invalidPhone = "0814939873344343434343";

      await signup.registerUser({
        firstName: "Test",
        lastName: "PhoneFormat",
        email: `invalidphone${Date.now()}@example.com`,
        phone: invalidPhone,
        password: "Com@sci54",
      });

      await commonPage.expectErrorPopup(
        "REG_1003",
        `Invalid Formats: ${invalidPhone}`
      );
    });

    test("TC_REG_05: Invalid first name @regression", async () => {
      const invalidName = "John123";

      await signup.registerUser({
        firstName: invalidName,
        lastName: "User",
        email: `nameformat${Date.now()}@mail.com`,
        phone: "0812345678",
        password: "Com@sci54",
      });

      await commonPage.expectErrorPopup(
        "REG_1003",
        `Invalid Formats: ${invalidName}`
      );
    });

    test("TC_REG_06: Invalid last name @regression", async () => {
      const invalidLastName = "Smith123!";

      await signup.registerUser({
        firstName: "Valid",
        lastName: invalidLastName,
        email: `lastname${Date.now()}@mail.com`,
        phone: "0812345678",
        password: "Com@sci54",
      });

      await commonPage.expectErrorPopup(
        "REG_1003",
        `Invalid Formats: ${invalidLastName}`
      );
    });
  });
});
