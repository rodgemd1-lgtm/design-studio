# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/layout.spec.ts >> RIG Design Studio — Layout & Alignment >> color swatches render in site cards
- Location: tests/layout.spec.ts:77:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]: Loading Design Studio...
  - alert [ref=e3]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE = 'https://app-gray-kappa-73.vercel.app';
  4   | test.use({ viewport: { width: 1440, height: 900 } });
  5   | 
  6   | test.describe('RIG Design Studio — Layout & Alignment', () => {
  7   | 
  8   |   test('page loads without errors and shows dashboard', async ({ page }) => {
  9   |     const errors: string[] = [];
  10  |     page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  11  |     page.on('pageerror', err => errors.push(err.message));
  12  |     await page.goto(BASE);
  13  |     await page.waitForSelector('text=Design Intelligence Dashboard', { timeout: 10000 });
  14  |     const criticalErrors = errors.filter(e => !e.includes('favicon') && !e.includes('net::'));
  15  |     console.log('Errors:', criticalErrors);
  16  |     expect(criticalErrors).toHaveLength(0);
  17  |   });
  18  | 
  19  |   test('stats grid shows 5 cards with non-zero data', async ({ page }) => {
  20  |     await page.goto(BASE);
  21  |     await page.waitForSelector('text=Design Intelligence Dashboard');
  22  |     // The stats grid should contain these values
  23  |     const main = page.locator('main');
  24  |     await expect(main).toContainText('2,479');
  25  |     await expect(main).toContainText('YouTube Videos');
  26  |     await expect(main).toContainText('Sites Extracted');
  27  |     await expect(main).toContainText('GitHub Repos');
  28  |     await expect(main).toContainText('Techniques');
  29  |   });
  30  | 
  31  |   test('sidebar renders with RIG branding', async ({ page }) => {
  32  |     await page.goto(BASE);
  33  |     const nav = page.locator('aside');
  34  |     await expect(nav).toBeVisible();
  35  |     await expect(nav).toContainText('RIG');
  36  |     await expect(nav).toContainText('V10');
  37  |   });
  38  | 
  39  |   test('YouTube section shows video cards', async ({ page }) => {
  40  |     await page.goto(BASE);
  41  |     await expect(page.locator('text=Recent YouTube Videos')).toBeVisible();
  42  |     const ytLinks = page.locator('main >> a[href*="youtube.com"]');
  43  |     const count = await ytLinks.count();
  44  |     console.log('YouTube links:', count);
  45  |     expect(count).toBeGreaterThanOrEqual(4);
  46  |   });
  47  | 
  48  |   test('site extractions section is visible', async ({ page }) => {
  49  |     await page.goto(BASE);
  50  |     await expect(page.locator('text=Site Extractions')).toBeVisible();
  51  |   });
  52  | 
  53  |   test('no horizontal overflow', async ({ page }) => {
  54  |     await page.goto(BASE);
  55  |     const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  56  |     console.log('Body width:', bodyWidth);
  57  |     expect(bodyWidth).toBeLessThanOrEqual(1460); // 1440 + small tolerance
  58  |   });
  59  | 
  60  |   test('main content positioned right of sidebar', async ({ page }) => {
  61  |     await page.goto(BASE);
  62  |     const mainBox = await page.locator('main').boundingBox();
  63  |     expect(mainBox).not.toBeNull();
  64  |     expect(mainBox!.x).toBe(220);
  65  |   });
  66  | 
  67  |   test('techniques count visible', async ({ page }) => {
  68  |     await page.goto(BASE);
  69  |     await expect(page.locator('text=Techniques')).toBeVisible();
  70  |   });
  71  | 
  72  |   test('tools section visible', async ({ page }) => {
  73  |     await page.goto(BASE);
  74  |     await expect(page.locator('text=Tools')).toBeVisible();
  75  |   });
  76  | 
  77  |   test('color swatches render in site cards', async ({ page }) => {
  78  |     await page.goto(BASE);
  79  |     // Color swatches are 16x16 divs with background colors
  80  |     const swatches = page.locator('main >> div[style*="width:16px"][style*="height:16px"]');
  81  |     const count = await swatches.count();
  82  |     console.log('Color swatches:', count);
> 83  |     expect(count).toBeGreaterThan(0);
      |                   ^ Error: expect(received).toBeGreaterThan(expected)
  84  |   });
  85  | 
  86  |   test('technique tags render as pills', async ({ page }) => {
  87  |     await page.goto(BASE);
  88  |     // Technique tags have teal border
  89  |     const tags = page.locator('main >> text=glassmorphism');
  90  |     if (await tags.count() > 0) {
  91  |       await expect(tags.first()).toBeVisible();
  92  |     }
  93  |   });
  94  | 
  95  |   test('stats cards respond to viewport', async ({ page }) => {
  96  |     await page.goto(BASE);
  97  |     await page.waitForSelector('text=Design Intelligence Dashboard');
  98  | 
  99  |     // Desktop
  100 |     await page.setViewportSize({ width: 1440, height: 900 });
  101 |     await page.waitForTimeout(500);
  102 |     const grid1440 = await page.locator('main >> css=div >> nth=1').boundingBox();
  103 |     console.log('1440px grid:', grid1440);
  104 |   });
  105 | 
  106 |   test('screenshot for visual audit', async ({ page }) => {
  107 |     await page.goto(BASE);
  108 |     await page.waitForSelector('text=Design Intelligence Dashboard');
  109 |     await page.waitForTimeout(3000);
  110 |     await page.screenshot({ path: 'tests/screenshots/design-studio.png', fullPage: false });
  111 |   });
  112 | });
  113 | 
```