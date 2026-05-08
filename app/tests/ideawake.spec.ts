import { test, expect } from '@playwright/test';
const BASE = 'http://localhost:9876/ideawake-deconstruction.html';
test.use({ viewport: { width: 1440, height: 900 } });

test.describe('Ideawake Deconstruction', () => {
  test('page loads', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Turn distributed intelligence')).toBeVisible();
  });

  test('hero cube and dot', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('.logo-cube')).toBeVisible();
    await expect(page.locator('.logo-dot')).toBeVisible();
  });

  test('6 hexacube faces in DOM', async ({ page }) => {
    await page.goto(BASE);
    expect(await page.locator('.hface').count()).toBe(6);
  });

  test('face labels exist in page content', async ({ page }) => {
    await page.goto(BASE);
    const content = await page.content();
    expect(content).toContain('Spark Capture');
    expect(content).toContain('Lens Map');
    expect(content).toContain('Pressure Test');
    expect(content).toContain('Deviation Engine');
    expect(content).toContain('Strike Point');
    expect(content).toContain('Launch Forge');
  });

  test('6 callouts in DOM', async ({ page }) => {
    await page.goto(BASE);
    expect(await page.locator('.callout').count()).toBe(6);
  });

  test('progress bar exists', async ({ page }) => {
    await page.goto(BASE);
    expect(await page.locator('.prog-bar').count()).toBe(1);
  });

  test('6 progress dots', async ({ page }) => {
    await page.goto(BASE);
    expect(await page.locator('.pdot').count()).toBe(6);
  });

  test('scroll triggers explosion', async ({ page }) => {
    await page.goto(BASE);
    // Scroll deep into the deconstruction section
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(2000);
    const cls = await page.locator('#hexacube').getAttribute('class');
    expect(cls).toContain('exploded');
  });

  test('CTA visible', async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('text=Ready to build your deconstruction?')).toBeVisible();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(BASE);
    await page.waitForTimeout(2000);
    expect(errors.filter(e => !e.includes('favicon') && !e.includes('net::'))).toHaveLength(0);
  });

  test('screenshot', async ({ page }) => {
    await page.goto(BASE);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/ideawake-final.png' });
    console.log('Screenshot saved to /tmp/ideawake-final.png');
  });
});
