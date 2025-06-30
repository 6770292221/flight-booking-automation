export const LoginExpectedResult = {
  SUCCESS: {
    userDisplayName: "imaikungki",
  },

  MISSING_FIELDS: {
    code: "LGN_2002",
    message:
      "Missing required information: flightId, email, password and otp are mandatory.",
  },

  INVALID_CREDENTIALS: {
    code: "LGN_2003",
    message: "The email you entered is incorrect. Please try again.",
  },

  INVALID_OTP: {
    code: "OTP_1002",
    message: "Invalid OTP. Please try again.",
  },
};
