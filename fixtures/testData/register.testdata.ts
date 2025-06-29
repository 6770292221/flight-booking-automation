export const RegisterTestdata = {
  VALID: {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "0812345678",
    password: "Com@sci54",
  },

  DUPLICATE_EMAIL: {
    firstName: "Any",
    lastName: "Name",
    email: "maicomsci54@gmail.com", // already exists
    phone: "0812345678",
    password: "Com@sci54",
  },

  WEAK_PASSWORD: (email: string) => ({
    firstName: "Weak",
    lastName: "Password",
    email,
    phone: "0812345678",
    password: "abc123", // too weak
  }),

  INVALID_PHONE: (email: string, phone: string) => ({
    firstName: "Test",
    lastName: "PhoneFormat",
    email,
    phone,
    password: "Com@sci54",
  }),

  INVALID_FIRST_NAME: (email: string, firstName: string) => ({
    firstName,
    lastName: "User",
    email,
    phone: "0812345678",
    password: "Com@sci54",
  }),

  INVALID_LAST_NAME: (email: string, lastName: string) => ({
    firstName: "Valid",
    lastName,
    email,
    phone: "0812345678",
    password: "Com@sci54",
  }),
};
