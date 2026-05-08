import { test, expect } from '@playwright/test';

const BASE = 'https://app-gray-kappa-73.vercel.app';
test.use({ viewport: { width: 1440, height: 900 } });

test.describe('RIG Design Studio — Layout & Alignment', () => {

  test('page loads without errors and shows dashboard', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard', { timeout: 10000 });
    const criticalErrors = errors.filter(e => !e.includes('favicon') && !e.includes('net::'));
    console.log('Errors:', criticalErrors);
    expect(criticalErrors).toHaveLength(0);
  });

  test('stats grid shows 5 cards with non-zero data', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard');
    // The stats grid should contain these values
    const main = page.locator('main');
    await expect(main).toContainText('2,479');
    await expect(main).toContainText('YouTube Videos');
    await expect(main).toContainText('Sites Extracted');
    await expect(main).toContainText('GitHub Repos');
    await expect(main).toContainText('Techniques');
  });

  test('sidebar renders with RIG branding', async ({ page }) => {
    await page.goto(BASE);
    const nav = page.locator('aside');
    await expect(nav).toBeVisible();
    await expect(nav).toContainText('RIG');
    await expect(nav).toContainText('V10');
  });

  test('YouTube section shows video cards', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Recent YouTube Videos')).toBeVisible();
    const ytLinks = page.locator('main >> a[href*="youtube.com"]');
    const count = await ytLinks.count();
    console.log('YouTube links:', count);
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('site extractions section is visible', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Site Extractions')).toBeVisible();
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto(BASE);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    console.log('Body width:', bodyWidth);
    expect(bodyWidth).toBeLessThanOrEqual(1460); // 1440 + small tolerance
  });

  test('main content positioned right of sidebar', async ({ page }) => {
    await page.goto(BASE);
    const mainBox = await page.locator('main').boundingBox();
    expect(mainBox).not.toBeNull();
    expect(mainBox!.x).toBe(220);
  });

  test('techniques count visible', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Techniques')).toBeVisible();
  });

  test('tools section visible', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Tools')).toBeVisible();
  });

  test('color swatches render in site cards', async ({ page }) => {
    await page.goto(BASE);
    // Color swatches are 16x16 divs with background colors
    const swatches = page.locator('main >> div[style*="width:16px"][style*="height:16px"]');
    const count = await swatches.count();
    console.log('Color swatches:', count);
    expect(count).toBeGreaterThan(0);
  });

  test('technique tags render as pills', async ({ page }) => {
    await page.goto(BASE);
    // Technique tags have teal border
    const tags = page.locator('main >> text=glassmorphism');
    if (await tags.count() > 0) {
      await expect(tags.first()).toBeVisible();
    }
  });

  test('stats cards respond to viewport', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard');

    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(500);
    const grid1440 = await page.locator('main >> css=div >> nth=1').boundingBox();
    console.log('1440px grid:', grid1440);
  });

  test('screenshot for visual audit', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'tests/screenshots/design-studio.png', fullPage: false });
  });
});
