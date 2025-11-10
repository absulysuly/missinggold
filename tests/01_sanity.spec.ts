import { test, expect } from '@playwright/test';

test('app boots and homepage loads without console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  await page.goto('/');
  await expect(page).toHaveTitle(/MissingGold/i);
  await expect(page.getByRole('navigation')).toBeVisible();
  expect(errors, `Console errors: ${errors.join('\n')}`).toHaveLength(0);
});
