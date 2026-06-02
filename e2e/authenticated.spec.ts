import { expect, test } from "@playwright/test";

test.use({ storageState: "e2e/.auth/user.json" });

test.describe("Dashboard (authenticated)", () => {
	test("shows repertoire list heading", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("My Repertoires")).toBeVisible();
	});

	test("shows New Repertoire button", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("New Repertoire")).toBeVisible();
	});

	test("can create a new repertoire", async ({ page }) => {
		await page.goto("/");
		await page.getByText("New Repertoire").click();

		// Dialog should appear
		await expect(page.getByText("Create Repertoire")).toBeVisible();

		await page.getByLabel("Name").fill("E2E Test Repertoire");
		await page.getByRole("button", { name: "♔ White" }).click();
		await page.getByRole("button", { name: "Create" }).click();

		// Dialog closes, card should appear
		await expect(page.getByText("E2E Test Repertoire")).toBeVisible({
			timeout: 5000,
		});
	});
});

test.describe("Repertoire editor (authenticated)", () => {
	let repertoireUrl: string;

	test.beforeEach(async ({ page }) => {
		// Create a repertoire to work with
		await page.goto("/");
		await page.getByText("New Repertoire").click();
		await page.getByLabel("Name").fill("Editor Test");
		await page.getByRole("button", { name: "♔ White" }).click();
		await page.getByRole("button", { name: "Create" }).click();

		// Wait for card and click into it
		const card = page.getByText("Editor Test");
		await card.waitFor({ timeout: 5000 });
		await card.click();

		// Wait for editor page to load
		await page.waitForURL(/\/repertoire\//, { timeout: 5000 });
		repertoireUrl = page.url();
	});

	test("editor page loads without JS errors", async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (err) => errors.push(err.message));

		await page.goto(repertoireUrl);
		await page.waitForLoadState("networkidle");

		// Give extra time for dynamic imports
		await page.waitForTimeout(3000);

		expect(errors).toEqual([]);
	});

	test("shows repertoire name in header", async ({ page }) => {
		await expect(page.getByText("Editor Test")).toBeVisible();
	});

	test("shows Back button", async ({ page }) => {
		await expect(page.getByText("← Back")).toBeVisible();
	});

	test("shows Import PGN button", async ({ page }) => {
		await expect(page.getByText("Import PGN")).toBeVisible();
	});

	test("shows Settings link", async ({ page }) => {
		await expect(page.getByText("Settings")).toBeVisible();
	});

	test("chessboard renders", async ({ page }) => {
		// Wait for the dynamically imported board
		const board = page.locator('[id^="chess-tree-board"]');
		await expect(board).toBeVisible({ timeout: 10000 });
	});

	test("details panel shows Starting position for root node", async ({
		page,
	}) => {
		await expect(page.getByText("Starting position")).toBeVisible({
			timeout: 5000,
		});
	});

	test("back button navigates to dashboard", async ({ page }) => {
		await page.getByText("← Back").click();
		await expect(page).toHaveURL("/");
	});

	test("import PGN dialog opens", async ({ page }) => {
		await page.getByText("Import PGN").click();
		await expect(page.getByText("Upload .pgn file")).toBeVisible();
		await expect(
			page.getByPlaceholder("1. e4 e5 2. Nf3 Nc6 ..."),
		).toBeVisible();
	});
});

test.describe("Settings (authenticated)", () => {
	test("shows account section with user info", async ({ page }) => {
		await page.goto("/settings");
		await expect(page.getByText("Account")).toBeVisible();
		await expect(page.getByText("Test User")).toBeVisible();
		await expect(page.getByText("Free Plan")).toBeVisible();
	});

	test("shows sign out button", async ({ page }) => {
		await page.goto("/settings");
		await expect(
			page.getByRole("button", { name: "Sign Out" }),
		).toBeVisible();
	});
});
