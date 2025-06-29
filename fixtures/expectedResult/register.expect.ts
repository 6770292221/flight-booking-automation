export const RegisterExpectedResult = {
  SUCCESS_MESSAGE: "Registration Successful!",
  SUCCESS_CODE: "REG_1001",

  DUPLICATE_EMAIL: {
    code: "REG_1005",
    message: "Email Already Exists: The email already exists in the system.",
  },

  WEAK_PASSWORD: {
    code: "REG_1006",
    message: `Password must meet the following requirements: 1. Length between 8 and 20 characters, 2. At 
least one uppercase letter (A-Z), 3. At least one lowercase letter (a-z), 4. At
least one number (0-9), 5. At least 
one special character (e.g., !@#$%^&*(),.?":{}|<>).`,
  },

  INVALID_FORMAT: (fieldValue: string) => ({
    code: "REG_1003",
    message: `Invalid Formats: ${fieldValue}`,
  }),
};
