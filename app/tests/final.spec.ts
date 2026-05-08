import { test, expect } from '@playwright/test';
const BASE = 'http://localhost:9876/index.html';
test.use({ viewport: { width: 1440, height: 900 } });

test.describe('RIG Design Studio V10 — Full Audit', () => {
  test('page loads with all data', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Design Intelligence Dashboard')).toBeVisible();
    await expect(page.locator('.stat-card').first()).toBeVisible();
    await expect(page.locator('text=Sites Extracted')).toBeVisible();
    await expect(page.locator('text=Techniques (11)')).toBeVisible();
  });

  test('stats grid has 5 cards', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('.stat-card')).toHaveCount(5);
  });

  test('sidebar has 11 nav items', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('.sidebar nav a')).toHaveCount(11);
  });

  test('YouTube videos render', async ({ page }) => {
    await page.goto(BASE);
    expect(await page.locator('#page-dashboard .video-item').count()).toBeGreaterThanOrEqual(6);
  });

  test('site extractions have color swatches', async ({ page }) => {
    await page.goto(BASE);
    expect(await page.locator('#page-dashboard .color-swatch').count()).toBeGreaterThan(5);
  });

  test('technique pills render', async ({ page }) => {
    await page.goto(BASE);
    await page.click('text=Techniques');
    await expect(page.locator('#page-techniques')).toHaveClass(/active/);
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto(BASE);
    const w = await page.evaluate(() => document.body.scrollWidth);
    expect(w).toBeLessThanOrEqual(1460);
  });

  test('main at x=220', async ({ page }) => {
    await page.goto(BASE);
    const box = await page.locator('.main').boundingBox();
    expect(box!.x).toBe(220);
  });

  test('navigation works', async ({ page }) => {
    await page.goto(BASE);
    await page.click('text=Sites');
    await expect(page.locator('#page-sites')).toHaveClass(/active/);
    await page.click('text=Dashboard');
    await expect(page.locator('#page-dashboard')).toHaveClass(/active/);
  });

  test('score design works', async ({ page }) => {
    await page.goto(BASE);
    await page.click('text=Score');
    await page.fill('#scoreInput', 'Test design copy.');
    await page.click('text=Score Design');
    await expect(page.locator('#scoreResult')).toBeVisible();
  });

  test('screenshot', async ({ page }) => {
    await page.goto(BASE);
    await page.screenshot({ path: '/tmp/design-studio-v10.png', fullPage: false });
  });
});
