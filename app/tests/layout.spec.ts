import { test, expect } from '@playwright/test';
const BASE = 'https://app-gray-kappa-73.vercel.app';
test.use({ viewport: { width: 1440, height: 900 } });

test.describe('RIG Design Studio — Comprehensive Layout Audit', () => {
  test('page loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard', { timeout: 10000 });
    const critical = errors.filter(e => !e.includes('favicon') && !e.includes('net::'));
    expect(critical).toHaveLength(0);
  });

  test('stats grid shows 5 cards with data', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard');
    const main = page.locator('main');
    await expect(main).toContainText('2,479');
    await expect(main).toContainText('YouTube Videos');
    await expect(main).toContainText('Sites Extracted');
    await expect(main).toContainText('GitHub Repos');
  });

  test('sidebar renders with RIG branding', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=RIG')).toBeVisible();
    await expect(page.locator('text=V10')).toBeVisible();
  });

  test('YouTube section shows video cards', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Recent YouTube Videos')).toBeVisible();
    const ytLinks = page.locator('main >> a[href*="youtube.com"]');
    expect(await ytLinks.count()).toBeGreaterThanOrEqual(4);
  });

  test('site extractions section visible', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Site Extractions')).toBeVisible();
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto(BASE);
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(1460);
  });

  test('main content at x=220 (right of sidebar)', async ({ page }) => {
    await page.goto(BASE);
    const mainBox = await page.locator('main').boundingBox();
    expect(mainBox).not.toBeNull();
    expect(mainBox!.x).toBe(220);
  });

  test('techniques section shows count', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Techniques (11)')).toBeVisible();
  });

  test('tools section shows count', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Tools (12)')).toBeVisible();
  });

  test('color swatches render', async ({ page }) => {
    await page.goto(BASE);
    // Color swatches are divs with background-color in site cards
    const swatches = page.locator('main >> div[style*="background"]');
    const count = await swatches.count();
    console.log('Elements with background:', count);
    expect(count).toBeGreaterThan(5);
  });

  test('technique pills render', async ({ page }) => {
    await page.goto(BASE);
    // Look for technique-related text in the techniques section
    const hasTechniques = await page.evaluate(() => {
      const text = document.querySelector('main')?.textContent || '';
      return text.includes('glassmorphism') || text.includes('parallax') || text.includes('webgl') || text.includes('sticky');
    });
    expect(hasTechniques).toBe(true);
  });

  test('full page screenshot', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForSelector('text=Design Intelligence Dashboard');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'tests/screenshots/final-audit.png', fullPage: false });
    console.log('Final screenshot saved');
  });
});
