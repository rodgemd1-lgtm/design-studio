import { test, expect } from '@playwright/test';

const BASE = 'https://design-studio-dashboard.vercel.app';

test('dashboard loads and shows stats', async ({ page }) => {
  await page.goto(BASE);
  await page.waitForSelector('text=Design Intelligence Dashboard');
  
  // Check stats are visible
  await expect(page.locator('text=2,479')).toBeVisible();
  await expect(page.locator('text=YouTube Videos')).toBeVisible();
  await expect(page.locator('text=8')).toBeVisible();
  await expect(page.locator('text=Sites Extracted')).toBeVisible();
  await expect(page.locator('text=20')).toBeVisible();
  await expect(page.locator('text=GitHub Repos')).toBeVisible();
});

test('sidebar navigation works', async ({ page }) => {
  await page.goto(BASE);
  await page.waitForSelector('text=Design Intelligence Dashboard');
  
  // Click Site Extractions
  await page.click('text=Site Extractions');
  await page.waitForSelector('text=Reverse-engineered design intelligence');
  await expect(page.locator('text=Linear')).toBeVisible();
  await expect(page.locator('text=Stripe')).toBeVisible();
  
  // Click YouTube Videos
  await page.click('text=YouTube Videos');
  await page.waitForSelector('text=2,479 videos from 33 channels');
  await expect(page.locator('text=DesignCourse').first()).toBeVisible();
  
  // Click GitHub Repos
  await page.click('text=GitHub Repos');
  await page.waitForSelector('text=shadcn/ui');
  await expect(page.locator('text=Drei')).toBeVisible();
  
  // Click Techniques
  await page.click('text=Techniques');
  await page.waitForSelector('text=glassmorphism');
  await expect(page.locator('text=parallax')).toBeVisible();
  
  // Click Provocations
  await page.click('text=Provocations');
  await page.waitForSelector('text=100 Provocations');
  await expect(page.locator('text=ORTHODOXY')).toBeVisible();
  
  // Click Forbidden
  await page.click('text=Forbidden');
  await page.waitForSelector('text=Forbidden List');
  await expect(page.locator('text=excited to share')).toBeVisible();
});

test('dark theme is applied', async ({ page }) => {
  await page.goto(BASE);
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // Should be dark (#0a0a0c = rgb(10, 10, 12))
  expect(bg).toBe('rgb(10, 10, 12)');
});

test('site extraction cards show colors and techniques', async ({ page }) => {
  await page.goto(BASE);
  await page.click('text=Site Extractions');
  await page.waitForSelector('text=Linear');
  
  // Check color swatches are visible
  const swatches = page.locator('[title="#08090a"]');
  await expect(swatches.first()).toBeVisible();
  
  // Check technique tags
  await expect(page.locator('text=sticky_header').first()).toBeVisible();
});

test('code snippets are visible', async ({ page }) => {
  await page.goto(BASE);
  await page.click('text=Code Snippets');
  await page.waitForSelector('text=Copyable code');
  
  await expect(page.locator('text=Linear — CSS Grid Dot Animation')).toBeVisible();
  await expect(page.locator('text=Raycast — Gradient Mesh')).toBeVisible();
  await expect(page.locator('text=GSAP — Horizontal Scroll')).toBeVisible();
});

test('scoring works', async ({ page }) => {
  await page.goto(BASE);
  await page.click('text=Score Design');
  await page.waitForSelector('text=Score a Design');
  
  // Type some text
  await page.fill('textarea', 'This is a test design copy. It has multiple sentences. Each one should be scored.');
  await page.click('text=◈ Score Design');
  
  // Check results appear
  await page.waitForSelector('text=Words:');
  await expect(page.locator('text=Words:')).toBeVisible();
});

test('responsive layout', async ({ page }) => {
  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE);
  await page.waitForSelector('text=Design Intelligence Dashboard');
  // Sidebar should be hidden on mobile
  const sidebar = page.locator('aside');
  await expect(sidebar).toBeVisible();
  
  // Desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.waitForSelector('text=Design Intelligence Dashboard');
  await expect(page.locator('text=Site Extractions')).toBeVisible();
});