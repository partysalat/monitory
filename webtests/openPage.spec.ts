import { test, expect } from '@playwright/test';

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('http://localhost:1337');

  await expect(page.getByText('Dashboards')).toBeVisible();
});
