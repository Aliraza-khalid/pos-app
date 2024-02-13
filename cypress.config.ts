import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://pos-app:3000",
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
    env: {
      SERVER_URL: process.env.SERVER_URL,
      LOGIN_DATA: {
        token:
          "eyJhbGciOiJIUzI1NiJ9.TUwzRFBIWkEwMjhWWQ.uiX2mpwIZKQRESJy9vt0U5WK-SmsUidzf4qayB-h5o0",
        merchant: {
          id: "ML3DPHZA028VY",
          businessName: "Default Test Account",
          country: "US",
          languageCode: "en-US",
          currency: "USD",
          status: "ACTIVE",
          mainLocationId: "L820JV3967W2Y",
          createdAt: "2024-01-09T16:10:56.273Z",
        },
        locations: [
          {
            id: "L820JV3967W2Y",
            name: "Default Test Account",
            address: {
              addressLine1: "1600 Pennsylvania Ave NW",
              locality: "Washington",
              administrativeDistrictLevel1: "DC",
              postalCode: "20500",
              country: "US",
            },
            timezone: "UTC",
            capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
            status: "ACTIVE",
            createdAt: "2024-01-09T16:10:56.274Z",
            merchantId: "ML3DPHZA028VY",
            country: "US",
            languageCode: "en-US",
            currency: "USD",
            businessName: "Default Test Account",
            type: "PHYSICAL",
            businessHours: {},
            mcc: "7299",
          },
        ],
      },
    },
  },
});
