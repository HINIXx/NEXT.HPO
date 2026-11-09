import { expect, test } from "@playwright/test";

test("header fits from 1101px to 2000px", async ({ page }) => {
  await page.goto("/");
  const failures: string[] = [];

  for (let width = 1101; width <= 2000; width += 10) {
    await page.setViewportSize({ width, height: 900 });
    const result = await page.evaluate(() => {
      const nav = document.querySelector<HTMLElement>("nav#navbar")!;
      const menu = nav.querySelector<HTMLElement>("ul")!;
      const actions = nav.querySelector<HTMLElement>(
        "div.ml-auto.flex.flex-none",
      )!;
      const toggle = actions.querySelector<HTMLElement>(
        'button[aria-label="Mở menu"]',
      )!;
      const visible = (element: Element) =>
        getComputedStyle(element).display !== "none";
      const boxes = [...actions.children]
        .filter(visible)
        .map((element) => element.getBoundingClientRect());
      const overlapping = boxes.some((a, index) =>
        boxes
          .slice(index + 1)
          .some(
            (b) =>
              a.left < b.right &&
              a.right > b.left &&
              a.top < b.bottom &&
              a.bottom > b.top,
          ),
      );
      return {
        scrollWidth: document.documentElement.scrollWidth,
        navHeight: nav.getBoundingClientRect().height,
        menuVisible: visible(menu),
        toggleVisible: visible(toggle),
        overlapping,
      };
    });

    if (result.scrollWidth > width)
      failures.push(`${width}px: horizontal overflow ${result.scrollWidth}px`);
    if (result.navHeight > 140)
      failures.push(`${width}px: navbar height ${result.navHeight}px`);
    if (result.overlapping)
      failures.push(`${width}px: action controls overlap`);
    if (result.menuVisible !== width >= 1351)
      failures.push(`${width}px: horizontal menu visibility`);
    if (result.toggleVisible !== width <= 1350)
      failures.push(`${width}px: menu button visibility`);
  }

  expect(failures).toEqual([]);
});
