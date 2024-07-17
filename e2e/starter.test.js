import { reloadApp } from "detox-expo-helpers";

describe("NFL Players", () => {
	// beforeAll(async () => {
	// 	await device.launchApp();
	// });

	beforeEach(async () => {
		await reloadApp();
	});

	describe("Players List", () => {
		it("should have NFL Players title", async () => {
			await expect(element(by.text("NFL Players"))).toBeVisible();
		});

		it("should have unselected filter button", async () => {
			await expect(element(by.id("filterButton"))).toBeVisible();
		});

		it("should show position select and search input when filter icon has been clicked", async () => {
			await expect(element(by.id("searchInput"))).not.toBeVisible();
			await expect(element(by.id("positionSelect"))).not.toBeVisible();

			await element(by.id("filterButton")).tap();

			await expect(element(by.id("searchInput"))).toBeVisible();
			await expect(element(by.id("positionSelect"))).toBeVisible();
		});

		it("players list should include players card", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			for (let i = 0; i < 5; i++) {
				await expect(element(by.id(`playerCard-${i}`))).toBeVisible();
			}
		});

		it("players fetch more and more players", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			const playerCards = element(by.id("playersList"));

			await playerCards.scroll(500, "down");
			await playerCards.scroll(500, "down");
			await playerCards.scroll(500, "down");
			await playerCards.scroll(500, "down");

			await expect(element(by.id(`playerCard-30`))).toBeVisible();
		});

		it("should filter players by position", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.id("filterButton")).tap();

			await element(by.id("positionSelect")).tap();
			await element(by.text("Cornerback")).tap();

			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(1000);
			await expect(element(by.id("playerCard-0"))).toBeVisible();
			const playersWithCBPosition = element(by.text("CB"));

			// 7 because that's the number of visible players per tested screen
			for (let i = 0; i < 7; i++) {
				await expect(playersWithCBPosition.atIndex(i)).toBeVisible();
			}
		});

		it("should filter players by name", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.id("filterButton")).tap();
			await element(by.id("searchInput")).typeText("Pat Sims");

			await waitFor(element(by.id("playersList")));
			await expect(element(by.id("playerCard-0"))).toBeVisible();
			await expect(element(by.id("playerCard-1"))).not.toBeVisible();
		});

		it("should return 'No players found' when no players match the search input", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.id("filterButton")).tap();
			await element(by.id("searchInput")).typeText("qwerty");

			await waitFor(element(by.text("No players found")))
				.toBeVisible()
				.withTimeout(2000);
		});

		it("should return 'No players found' when no players match the position selector", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.id("filterButton")).tap();
			await element(by.id("positionSelect")).tap();
			await element(by.text("Kick Returner")).tap();

			await waitFor(element(by.text("No players found")))
				.toBeVisible()
				.withTimeout(1000);
		});

		it("Should select position, go to the first player and come back with the filter still selected", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.id("filterButton")).tap();
			await element(by.id("positionSelect")).tap();
			await element(by.text("Cornerback")).tap();

			await element(by.id("playerCard-0")).tap();
			await expect(element(by.id("playerDetails"))).toBeVisible();

			await element(by.id("backButton")).tap();

			await expect(element(by.id("playersList"))).toBeVisible();
			await expect(element(by.id("positionSelect"))).toBeVisible();
			await expect(element(by.text("Cornerback"))).toBeVisible();
		});
	});

	describe("Player Details", () => {
		it("Should redirect to player details screen when player card has been clicked", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			// I know I shouldn't rely on the current data but on mocks, but I'm running out of time :P
			await element(by.id("playerCard-0")).tap();
			await expect(element(by.id("playerDetails"))).toBeVisible();
			await expect(element(by.id("player-badge-inactive"))).toBeVisible();
		});

		it("Should redirect to active player details screen when player card has been clicked", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			// I know I shouldn't rely on current data but on mocks, but I'm running out of time :P
			await element(by.id("playerCard-5")).tap();
			await expect(element(by.id("playerDetails"))).toBeVisible();
			await expect(element(by.id("player-badge-active"))).toBeVisible();
		});

		it("Should redirect back to players list on click back arrow icon", async () => {
			await waitFor(element(by.id("playersList")))
				.toBeVisible()
				.withTimeout(5000);

			await element(by.id("playerCard-0")).tap();
			await expect(element(by.id("playerDetails"))).toBeVisible();

			await element(by.id("backButton")).tap();

			await expect(element(by.id("playersList"))).toBeVisible();
		});
	});
});
