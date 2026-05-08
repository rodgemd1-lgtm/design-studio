# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/layout.spec.ts >> RIG Design Studio — Layout & Alignment >> tools section visible
- Location: tests/layout.spec.ts:72:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Tools')
Expected: visible
Error: strict mode violation: locator('text=Tools') resolved to 2 elements:
    1) <div>12 tools</div> aka getByText('12 tools')
    2) <h2>🔧 Tools (12)</h2> aka getByRole('heading', { name: '🔧 Tools (12)' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Tools')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - navigation [ref=e3]:
      - heading "RIG Design Studio" [level=1] [ref=e4]
      - paragraph [ref=e5]: V10 — Live
      - generic [ref=e6]:
        - generic [ref=e7]: ◈
        - generic [ref=e8]: Dashboard
      - generic [ref=e9]:
        - generic [ref=e10]: ◉
        - generic [ref=e11]: Sites
        - generic [ref=e12]: "8"
      - generic [ref=e13]:
        - generic [ref=e14]: ▶
        - generic [ref=e15]: Videos
        - generic [ref=e16]: "2479"
      - generic [ref=e17]:
        - generic [ref=e18]: ◫
        - generic [ref=e19]: Repos
        - generic [ref=e20]: "20"
      - generic [ref=e21]:
        - generic [ref=e22]: ◑
        - generic [ref=e23]: Tokens
      - generic [ref=e24]:
        - generic [ref=e25]: ◐
        - generic [ref=e26]: Techniques
        - generic [ref=e27]: "11"
      - generic [ref=e28]:
        - generic [ref=e29]: ⟨/⟩
        - generic [ref=e30]: Snippets
      - generic [ref=e31]:
        - generic [ref=e32]: ⊞
        - generic [ref=e33]: Studio
      - generic [ref=e34]:
        - generic [ref=e35]: "?"
        - generic [ref=e36]: Provoke
        - generic [ref=e37]: "100"
      - generic [ref=e38]:
        - generic [ref=e39]: ◈
        - generic [ref=e40]: Score
      - generic [ref=e41]:
        - generic [ref=e42]: ✕
        - generic [ref=e43]: Forbidden
    - main [ref=e44]:
      - heading "Design Intelligence Dashboard" [level=1] [ref=e45]
      - paragraph [ref=e46]: Live data — 8 sites, 2479 videos, 20 repos
      - generic [ref=e47]:
        - generic [ref=e48]:
          - generic [ref=e49]: 2,479
          - generic [ref=e50]: YouTube Videos
          - generic [ref=e51]: 33 channels
        - generic [ref=e52]:
          - generic [ref=e53]: "8"
          - generic [ref=e54]: Sites Extracted
          - generic [ref=e55]: 65 items
        - generic [ref=e56]:
          - generic [ref=e57]: "20"
          - generic [ref=e58]: GitHub Repos
          - generic [ref=e59]: 38 animations
        - generic [ref=e60]:
          - generic [ref=e61]: "11"
          - generic [ref=e62]: Techniques
          - generic [ref=e63]: 12 tools
        - generic [ref=e64]:
          - generic [ref=e65]: "161"
          - generic [ref=e66]: Susan Chunks
          - generic [ref=e67]: design-studio RAG
      - generic [ref=e68]:
        - generic [ref=e69]:
          - heading "▶ Recent YouTube Videos" [level=2] [ref=e70]
          - link "▶ 13 Mistakes Beginner UI Designers Make DesignCourse" [ref=e71] [cursor=pointer]:
            - /url: https://www.youtube.com/watch?v=B7UQS5My4D0
            - generic [ref=e72]: ▶
            - generic [ref=e73]:
              - generic [ref=e74]: 13 Mistakes Beginner UI Designers Make
              - generic [ref=e75]: DesignCourse
          - link "▶ SVG Filters are Sick! Image Turbulence & Displacement Tutorial DesignCourse" [ref=e76] [cursor=pointer]:
            - /url: https://www.youtube.com/watch?v=XYdDiZa_O3k
            - generic [ref=e77]: ▶
            - generic [ref=e78]:
              - generic [ref=e79]: SVG Filters are Sick! Image Turbulence & Displacement Tutorial
              - generic [ref=e80]: DesignCourse
          - link "▶ Native Lazy Loading + A Fallback Solution ..in 60 seconds DesignCourse" [ref=e81] [cursor=pointer]:
            - /url: https://www.youtube.com/watch?v=6mTKlOGBYfM
            - generic [ref=e82]: ▶
            - generic [ref=e83]:
              - generic [ref=e84]: Native Lazy Loading + A Fallback Solution ..in 60 seconds
              - generic [ref=e85]: DesignCourse
          - link "▶ CSS Multi-Columns - Awesome Newspaper Style Layouts (NO Flexbox or Grid) DesignCourse" [ref=e86] [cursor=pointer]:
            - /url: https://www.youtube.com/watch?v=syG7ljxqzNg
            - generic [ref=e87]: ▶
            - generic [ref=e88]:
              - generic [ref=e89]: CSS Multi-Columns - Awesome Newspaper Style Layouts (NO Flexbox or Grid)
              - generic [ref=e90]: DesignCourse
          - link "▶ Creating an Email List - MailChimp API Integration with Node.js DesignCourse" [ref=e91] [cursor=pointer]:
            - /url: https://www.youtube.com/watch?v=JLKzr83xZGo
            - generic [ref=e92]: ▶
            - generic [ref=e93]:
              - generic [ref=e94]: Creating an Email List - MailChimp API Integration with Node.js
              - generic [ref=e95]: DesignCourse
          - link "▶ From Prototype UI Design to HTML, CSS & JS Tutorial DesignCourse" [ref=e96] [cursor=pointer]:
            - /url: https://www.youtube.com/watch?v=GTyMUjhA-o4
            - generic [ref=e97]: ▶
            - generic [ref=e98]:
              - generic [ref=e99]: From Prototype UI Design to HTML, CSS & JS Tutorial
              - generic [ref=e100]: DesignCourse
        - generic [ref=e101]:
          - heading "◉ Site Extractions" [level=2] [ref=e102]
          - generic [ref=e103]:
            - generic [ref=e104]:
              - generic [ref=e105]:
                - generic [ref=e106]: "0"
                - generic [ref=e107]: https://stripe.com
              - generic [ref=e108]: "11"
            - generic [ref=e115]:
              - generic [ref=e116]: sticky header
              - generic [ref=e117]: micro interaction
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]: "1"
              - generic [ref=e122]: https://linear.app
            - generic [ref=e123]: "193"
          - generic [ref=e126]:
            - generic [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: "2"
                - generic [ref=e130]: https://vercel.com
              - generic [ref=e131]: "16"
            - generic [ref=e138]:
              - generic [ref=e139]: glassmorphism
              - generic [ref=e140]: horizontal scroll
              - generic [ref=e141]: masonry
              - generic [ref=e142]: sticky header
              - generic [ref=e143]: micro interaction
              - generic [ref=e144]: dark mode
              - generic [ref=e145]: canvas animation
              - generic [ref=e146]: container queries
          - generic [ref=e147]:
            - generic [ref=e148]:
              - generic [ref=e149]:
                - generic [ref=e150]: "3"
                - generic [ref=e151]: https://raycast.com
              - generic [ref=e152]: "26"
            - generic [ref=e159]:
              - generic [ref=e160]: glassmorphism
              - generic [ref=e161]: neumorphism
              - generic [ref=e162]: parallax
              - generic [ref=e163]: micro interaction
          - generic [ref=e164]:
            - generic [ref=e165]:
              - generic [ref=e166]:
                - generic [ref=e167]: "4"
                - generic [ref=e168]: https://obys.agency
              - generic [ref=e169]: "5"
            - generic [ref=e173]: micro interaction
      - generic [ref=e174]:
        - generic [ref=e175]:
          - heading "◐ Techniques (11)" [level=2] [ref=e176]
          - generic [ref=e177]:
            - generic [ref=e178]:
              - generic [ref=e179]: sticky header
              - generic [ref=e180]: Sticky nav
            - generic [ref=e181]: "2"
          - generic [ref=e182]:
            - generic [ref=e183]:
              - generic [ref=e184]: micro interaction
              - generic [ref=e185]: Hover/tap
            - generic [ref=e186]: "4"
          - generic [ref=e187]:
            - generic [ref=e188]:
              - generic [ref=e189]: glassmorphism
              - generic [ref=e190]: Backdrop blur
            - generic [ref=e191]: "3"
          - generic [ref=e192]:
            - generic [ref=e193]:
              - generic [ref=e194]: horizontal scroll
              - generic [ref=e195]: H-scroll
            - generic [ref=e196]: "2"
          - generic [ref=e197]:
            - generic [ref=e198]:
              - generic [ref=e199]: masonry
              - generic [ref=e200]: Masonry
            - generic [ref=e201]: "1"
          - generic [ref=e202]:
            - generic [ref=e203]:
              - generic [ref=e204]: dark mode
              - generic [ref=e205]: Dark theme
            - generic [ref=e206]: "1"
          - generic [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]: canvas animation
              - generic [ref=e210]: Canvas draw
            - generic [ref=e211]: "1"
          - generic [ref=e212]:
            - generic [ref=e213]:
              - generic [ref=e214]: container queries
              - generic [ref=e215]: Container responsive
            - generic [ref=e216]: "1"
        - generic [ref=e217]:
          - heading "◫ Cloned Repos (20)" [level=2] [ref=e218]
          - generic [ref=e219]:
            - generic [ref=e220]: ◫
            - generic [ref=e222]: design-system · anim · 0 comp
          - generic [ref=e223]:
            - generic [ref=e224]: ◫
            - generic [ref=e226]: design-system · anim · 0 comp
          - generic [ref=e227]:
            - generic [ref=e228]: ◫
            - generic [ref=e230]: design-system · anim · 0 comp
          - generic [ref=e231]:
            - generic [ref=e232]: ◫
            - generic [ref=e234]: design-system · anim · 0 comp
          - generic [ref=e235]:
            - generic [ref=e236]: ◫
            - generic [ref=e238]: animation · anim · 0 comp
          - generic [ref=e239]:
            - generic [ref=e240]: ◫
            - generic [ref=e242]: animation · anim · 0 comp
      - generic [ref=e243]:
        - heading "🔧 Tools (12)" [level=2] [ref=e244]
        - generic [ref=e245]:
          - generic [ref=e246]: svg
          - generic [ref=e247]: blender
          - generic [ref=e248]: three.js
          - generic [ref=e249]: figma
          - generic [ref=e250]: gsap
          - generic [ref=e251]: tailwind
          - generic [ref=e252]: framer
          - generic [ref=e253]: css animation
          - generic [ref=e254]: sketch
          - generic [ref=e255]: after effects
          - generic [ref=e256]: webgl
          - generic [ref=e257]: framer motion
  - alert [ref=e258]
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
> 74  |     await expect(page.locator('text=Tools')).toBeVisible();
      |                                              ^ Error: expect(locator).toBeVisible() failed
  75  |   });
  76  | 
  77  |   test('color swatches render in site cards', async ({ page }) => {
  78  |     await page.goto(BASE);
  79  |     // Color swatches are 16x16 divs with background colors
  80  |     const swatches = page.locator('main >> div[style*="width:16px"][style*="height:16px"]');
  81  |     const count = await swatches.count();
  82  |     console.log('Color swatches:', count);
  83  |     expect(count).toBeGreaterThan(0);
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