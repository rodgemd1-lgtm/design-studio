# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/dashboard.spec.ts >> sidebar navigation works
- Location: tests/dashboard.spec.ts:18:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Design Intelligence Dashboard') to be visible

```

# Page snapshot

```yaml
- main [ref=e3]:
  - paragraph [ref=e4]:
    - generic [ref=e5]:
      - strong [ref=e6]: "404"
      - text: ": NOT_FOUND"
    - generic [ref=e7]:
      - text: "Code:"
      - code [ref=e8]: "`NOT_FOUND`"
    - generic [ref=e9]:
      - text: "ID:"
      - code [ref=e10]: "`cle1::5f4ts-1778204938768-2fbe7dc7060d`"
  - link "Read our documentation to learn more about this error." [ref=e11] [cursor=pointer]:
    - /url: https://vercel.com/docs/errors/NOT_FOUND
    - generic [ref=e12]: Read our documentation to learn more about this error.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE = 'https://design-studio-dashboard.vercel.app';
  4   | 
  5   | test('dashboard loads and shows stats', async ({ page }) => {
  6   |   await page.goto(BASE);
  7   |   await page.waitForSelector('text=Design Intelligence Dashboard');
  8   |   
  9   |   // Check stats are visible
  10  |   await expect(page.locator('text=2,479')).toBeVisible();
  11  |   await expect(page.locator('text=YouTube Videos')).toBeVisible();
  12  |   await expect(page.locator('text=8')).toBeVisible();
  13  |   await expect(page.locator('text=Sites Extracted')).toBeVisible();
  14  |   await expect(page.locator('text=20')).toBeVisible();
  15  |   await expect(page.locator('text=GitHub Repos')).toBeVisible();
  16  | });
  17  | 
  18  | test('sidebar navigation works', async ({ page }) => {
  19  |   await page.goto(BASE);
> 20  |   await page.waitForSelector('text=Design Intelligence Dashboard');
      |              ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  21  |   
  22  |   // Click Site Extractions
  23  |   await page.click('text=Site Extractions');
  24  |   await page.waitForSelector('text=Reverse-engineered design intelligence');
  25  |   await expect(page.locator('text=Linear')).toBeVisible();
  26  |   await expect(page.locator('text=Stripe')).toBeVisible();
  27  |   
  28  |   // Click YouTube Videos
  29  |   await page.click('text=YouTube Videos');
  30  |   await page.waitForSelector('text=2,479 videos from 33 channels');
  31  |   await expect(page.locator('text=DesignCourse').first()).toBeVisible();
  32  |   
  33  |   // Click GitHub Repos
  34  |   await page.click('text=GitHub Repos');
  35  |   await page.waitForSelector('text=shadcn/ui');
  36  |   await expect(page.locator('text=Drei')).toBeVisible();
  37  |   
  38  |   // Click Techniques
  39  |   await page.click('text=Techniques');
  40  |   await page.waitForSelector('text=glassmorphism');
  41  |   await expect(page.locator('text=parallax')).toBeVisible();
  42  |   
  43  |   // Click Provocations
  44  |   await page.click('text=Provocations');
  45  |   await page.waitForSelector('text=100 Provocations');
  46  |   await expect(page.locator('text=ORTHODOXY')).toBeVisible();
  47  |   
  48  |   // Click Forbidden
  49  |   await page.click('text=Forbidden');
  50  |   await page.waitForSelector('text=Forbidden List');
  51  |   await expect(page.locator('text=excited to share')).toBeVisible();
  52  | });
  53  | 
  54  | test('dark theme is applied', async ({ page }) => {
  55  |   await page.goto(BASE);
  56  |   const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  57  |   // Should be dark (#0a0a0c = rgb(10, 10, 12))
  58  |   expect(bg).toBe('rgb(10, 10, 12)');
  59  | });
  60  | 
  61  | test('site extraction cards show colors and techniques', async ({ page }) => {
  62  |   await page.goto(BASE);
  63  |   await page.click('text=Site Extractions');
  64  |   await page.waitForSelector('text=Linear');
  65  |   
  66  |   // Check color swatches are visible
  67  |   const swatches = page.locator('[title="#08090a"]');
  68  |   await expect(swatches.first()).toBeVisible();
  69  |   
  70  |   // Check technique tags
  71  |   await expect(page.locator('text=sticky_header').first()).toBeVisible();
  72  | });
  73  | 
  74  | test('code snippets are visible', async ({ page }) => {
  75  |   await page.goto(BASE);
  76  |   await page.click('text=Code Snippets');
  77  |   await page.waitForSelector('text=Copyable code');
  78  |   
  79  |   await expect(page.locator('text=Linear — CSS Grid Dot Animation')).toBeVisible();
  80  |   await expect(page.locator('text=Raycast — Gradient Mesh')).toBeVisible();
  81  |   await expect(page.locator('text=GSAP — Horizontal Scroll')).toBeVisible();
  82  | });
  83  | 
  84  | test('scoring works', async ({ page }) => {
  85  |   await page.goto(BASE);
  86  |   await page.click('text=Score Design');
  87  |   await page.waitForSelector('text=Score a Design');
  88  |   
  89  |   // Type some text
  90  |   await page.fill('textarea', 'This is a test design copy. It has multiple sentences. Each one should be scored.');
  91  |   await page.click('text=◈ Score Design');
  92  |   
  93  |   // Check results appear
  94  |   await page.waitForSelector('text=Words:');
  95  |   await expect(page.locator('text=Words:')).toBeVisible();
  96  | });
  97  | 
  98  | test('responsive layout', async ({ page }) => {
  99  |   // Mobile
  100 |   await page.setViewportSize({ width: 375, height: 812 });
  101 |   await page.goto(BASE);
  102 |   await page.waitForSelector('text=Design Intelligence Dashboard');
  103 |   // Sidebar should be hidden on mobile
  104 |   const sidebar = page.locator('aside');
  105 |   await expect(sidebar).toBeVisible();
  106 |   
  107 |   // Desktop
  108 |   await page.setViewportSize({ width: 1440, height: 900 });
  109 |   await page.reload();
  110 |   await page.waitForSelector('text=Design Intelligence Dashboard');
  111 |   await expect(page.locator('text=Site Extractions')).toBeVisible();
  112 | });
```