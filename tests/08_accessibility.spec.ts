import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = ['/', '/payments/checkout', '/vouchers', '/campaigns/new', '/admin'];

test.describe('a11y scan (axe-core)', () => {
  for (const path of paths) {
    test(`axe: ${path}`, async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      const critical = results.violations.filter(v => ['critical','serious'].includes(v.impact || ''));
      test.info().attach('axe-results', { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
      expect(critical.length, `Critical/Serious a11y issues found on ${path}`).toBeLessThan(10);
    });
  }
});
