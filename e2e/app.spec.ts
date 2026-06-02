import { expect, test } from "@playwright/test";

test.describe("Landing page (unauthenticated)", () => {
	test("shows app title and sign-in button", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("Chess Tree")).toBeVisible();
		await expect(page.getByText("Sign in with Google")).toBeVisible();
	});

	test("sign-in link points to auth endpoint", async ({ page }) => {
		await page.goto("/");
		const link = page.getByText("Sign in with Google").locator("closest=a, ..");
		// The button or its parent should link to the auth signin page
		await expect(
			page.locator('a[href="/api/auth/signin"]'),
		).toBeVisible();
	});
});

test.describe("Settings page (unauthenticated)", () => {
	test("loads without crashing", async ({ page }) => {
		await page.goto("/settings");
		await expect(page.getByText("Settings")).toBeVisible();
	});

	test("shows board style picker", async ({ page }) => {
		await page.goto("/settings");
		await expect(page.getByText("Board Style")).toBeVisible();
		await expect(page.getByText("Classic")).toBeVisible();
		await expect(page.getByText("Marble")).toBeVisible();
		await expect(page.getByText("Tournament")).toBeVisible();
		// "Wooden" and "Dark" appear in both board styles and theme toggles
		await expect(page.getByText("Wooden").first()).toBeVisible();
		await expect(page.getByText("Dark").first()).toBeVisible();
	});

	test("shows piece set picker", async ({ page }) => {
		await page.goto("/settings");
		await expect(page.getByText("Piece Set")).toBeVisible();
		await expect(page.getByText("Kaneo")).toBeVisible();
		await expect(page.getByText("Cburnett")).toBeVisible();
	});

	test("shows site theme toggle", async ({ page }) => {
		await page.goto("/settings");
		await expect(page.getByText("Site Theme")).toBeVisible();
		// Theme buttons may share names with board styles, use .nth() for specificity
		await expect(page.getByRole("button", { name: "Light" })).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Dark" }).nth(1),
		).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Wooden" }).nth(1),
		).toBeVisible();
		await expect(
			page.getByRole("button", { name: "System" }),
		).toBeVisible();
	});

	test("shows preferences section", async ({ page }) => {
		await page.goto("/settings");
		await expect(page.getByText("Preferences")).toBeVisible();
		await expect(page.getByText("Sound effects")).toBeVisible();
		await expect(page.getByText("Show legal move indicators")).toBeVisible();
	});

	test("back button navigates to home", async ({ page }) => {
		await page.goto("/settings");
		await page.getByText("← Back").click();
		await expect(page).toHaveURL("/");
	});
});

test.describe("Repertoire page (unauthenticated)", () => {
	test("shows sign-in prompt instead of crashing", async ({ page }) => {
		await page.goto("/repertoire/some-fake-id");
		await expect(
			page.getByText("Sign in to access your repertoire"),
		).toBeVisible();
		await expect(page.getByText("Sign in with Google")).toBeVisible();
	});
});

test.describe("Auth flow", () => {
	test("signin page shows Google provider", async ({ page }) => {
		await page.goto("/api/auth/signin");
		// NextAuth default signin page should show Google option
		await expect(page.getByText(/google/i)).toBeVisible();
	});
});

test.describe("API endpoints", () => {
	test("tRPC endpoint returns 401 for unauthenticated requests", async ({
		request,
	}) => {
		const response = await request.get(
			"/api/trpc/repertoire.list?batch=1&input={}",
		);
		expect(response.status()).toBe(401);
	});

	test("tRPC preferences returns 401 for unauthenticated", async ({
		request,
	}) => {
		const response = await request.get(
			'/api/trpc/preferences.get?batch=1&input={"0":{"json":null}}',
		);
		expect(response.status()).toBe(401);
	});
});

test.describe("Static assets", () => {
	test("Kaneo piece SVGs are accessible", async ({ request }) => {
		for (const piece of ["wP", "wK", "bP", "bK"]) {
			const response = await request.get(`/pieces/kaneo/${piece}.svg`);
			expect(response.status()).toBe(200);
			const text = await response.text();
			expect(text).toContain("<svg");
		}
	});

	test("Cburnett piece SVGs are accessible", async ({ request }) => {
		for (const piece of ["wP", "wK", "bP", "bK"]) {
			const response = await request.get(`/pieces/cburnett/${piece}.svg`);
			expect(response.status()).toBe(200);
			const text = await response.text();
			expect(text).toContain("<svg");
		}
	});

	test("Sound files are accessible", async ({ request }) => {
		for (const sound of ["move", "capture", "check"]) {
			const response = await request.get(`/sounds/${sound}.mp3`);
			expect(response.status()).toBe(200);
		}
	});
});

test.describe("No console errors on page load", () => {
	test("home page has no JS errors", async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (err) => errors.push(err.message));

		await page.goto("/");
		await page.waitForLoadState("networkidle");

		expect(errors).toEqual([]);
	});

	test("settings page has no JS errors", async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (err) => errors.push(err.message));

		await page.goto("/settings");
		await page.waitForLoadState("networkidle");

		expect(errors).toEqual([]);
	});

	test("repertoire page has no JS errors when unauthenticated", async ({
		page,
	}) => {
		const errors: string[] = [];
		page.on("pageerror", (err) => errors.push(err.message));

		await page.goto("/repertoire/test-id");
		await page.waitForLoadState("networkidle");

		expect(errors).toEqual([]);
	});
});
