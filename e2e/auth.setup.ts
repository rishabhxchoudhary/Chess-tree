import { expect, test as setup } from "@playwright/test";

const TEST_EMAIL = process.env.TEST_USER_EMAIL ?? "test@chesstree.dev";
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD ?? "test1234";

setup("authenticate as test user", async ({ page }) => {
	await page.goto("/api/auth/signin");
	await page.waitForLoadState("networkidle");

	// Fill in credentials form (the "Test Account" provider)
	await page.getByLabel("Email").fill(TEST_EMAIL);
	await page.getByLabel("Password").fill(TEST_PASSWORD);
	await page.getByRole("button", { name: /sign in/i }).click();

	// Wait for redirect to home
	await page.waitForURL("/", { timeout: 10000 });
	await expect(page.getByText("My Repertoires")).toBeVisible();

	// Save auth state
	await page.context().storageState({ path: "e2e/.auth/user.json" });
});
