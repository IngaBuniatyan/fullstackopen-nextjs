import { existsSync, readFileSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

const testEnvironment = dotenv.config({
  path: ".env.test",
  override: true,
}).parsed;

if (!testEnvironment?.DATABASE_URL) {
  throw new Error(
    "A separate test DATABASE_URL is required in the ignored .env.test file",
  );
}

if (existsSync(".env.local")) {
  const localEnvironment = dotenv.parse(readFileSync(".env.local"));

  if (
    localEnvironment.DATABASE_URL &&
    localEnvironment.DATABASE_URL === testEnvironment.DATABASE_URL
  ) {
    throw new Error(
      "The test and production DATABASE_URL values must be different",
    );
  }
}

const testSecret =
  testEnvironment.AUTH_SECRET ?? testEnvironment.NEXTAUTH_SECRET;

if (!testSecret) {
  throw new Error("NEXTAUTH_SECRET is required in .env.test");
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      DATABASE_URL: testEnvironment.DATABASE_URL,
      AUTH_SECRET: testSecret,
      AUTH_URL:
        testEnvironment.AUTH_URL ??
        testEnvironment.NEXTAUTH_URL ??
        "http://localhost:3000",
      NEXTAUTH_SECRET: testSecret,
      NEXTAUTH_URL:
        testEnvironment.NEXTAUTH_URL ??
        testEnvironment.AUTH_URL ??
        "http://localhost:3000",
      NODE_ENV: "test",
    },
  },
});
