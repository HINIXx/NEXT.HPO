import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3100" },
  projects: [{ name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm run preview:out",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
  },
});
