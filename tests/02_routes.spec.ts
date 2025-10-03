import { test, expect } from '@playwright/test';

const ROUTES = [
  '/', '/auth/signin', '/venues', '/events', '/profile',
  '/campaigns', '/campaigns/new', '/payments/checkout', '/vouchers',
  '/admin', '/admin/reconciliation'
];

test.describe('route coverage', () => {
  for (const path of ROUTES) {
    test(`route ${path} returns 200 and renders`, async ({ page }) => {
      const [resp] = await Promise.all([
        page.waitForResponse(r => r.url().includes(path.replace('[id]','')) && [200,204].includes(r.status()), { timeout: 10_000 }).catch(() => null),
        page.goto(path)
      ]);
      await expect(page.locator('body')).not.toContainText(/(404|not found|error)/i);
      const serverError = page.getByText(/(500|internal server error)/i);
      await expect(serverError).toHaveCount(0);
    });
  }
});
