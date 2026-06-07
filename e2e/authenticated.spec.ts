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

		await expect(page.getByText("Create Repertoire")).toBeVisible();

		const name = `Test-${Date.now()}`;
		await page.getByLabel("Name").fill(name);
		await page.getByRole("button", { name: "♔ White" }).click();
		await page.getByRole("button", { name: "Create" }).click();

		await expect(page.getByText(name)).toBeVisible({ timeout: 5000 });
	});
});

test.describe("Repertoire editor (authenticated)", () => {
	test.beforeEach(async ({ page }, testInfo) => {
		await page.goto("/");

		const name = `E2E-${testInfo.title.slice(0, 10)}-${Date.now()}`;
		await page.getByText("New Repertoire").click();
		await page.getByLabel("Name").fill(name);
		await page.getByRole("button", { name: "♔ White" }).click();
		await page.getByRole("button", { name: "Create" }).click();

		await page.getByText(name).first().waitFor({ timeout: 5000 });
		await page.getByText(name).first().click();
		await page.waitForURL(/\/repertoire\//, { timeout: 5000 });
	});

	test("editor page loads without JS errors", async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (err) => errors.push(err.message));

		await page.waitForLoadState("networkidle");
		await page.waitForTimeout(3000);

		expect(errors).toEqual([]);
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
		const board = page.locator(
			'[data-boardid="chess-tree-board"], [id*="chess-tree-board"]',
		);
		await expect(board.first()).toBeVisible({ timeout: 10000 });
	});

	test("details panel shows repertoire notes prompt at root", async ({
		page,
	}) => {
		await expect(
			page.getByPlaceholder("Add notes about this repertoire..."),
		).toBeVisible({ timeout: 5000 });
	});

	test("back button navigates to dashboard", async ({ page }) => {
		await page.getByText("← Back").click();
		await expect(page).toHaveURL("/", { timeout: 10000 });
	});

	test("import PGN dialog opens", async ({ page }) => {
		await page.getByText("Import PGN").click();
		await expect(page.getByText("Upload .pgn file")).toBeVisible();
		await expect(
			page.getByPlaceholder("1. e4 e5 2. Nf3 Nc6 ..."),
		).toBeVisible();
	});

	// NOTE: Click/drag move-making is not E2E-tested — react-chessboard v4 uses
	// react-dnd's HTML5 backend, which doesn't respond to Playwright's synthetic
	// pointer/drag events in headless mode. The optimistic move logic (synchronous
	// addMove, rapid consecutive moves with no stale-state errors,
	// client-generated UUIDs, selection preservation) is fully covered by unit
	// tests in src/hooks/use-repertoire-store.test.ts.
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
