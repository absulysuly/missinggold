import { test, expect } from '@playwright/test';

const languages = [
  { code: 'en', rtl: false },
  { code: 'ar', rtl: true },
  { code: 'ku', rtl: true }
];

test.describe('i18n & RTL on payments and vouchers', () => {
  for (const lang of languages) {
    test(`language ${lang.code}`, async ({ page }) => {
      await page.goto(`/?lang=${lang.code}`);
      await page.goto(`/payments/checkout?lang=${lang.code}`);
      await expect(page.locator('body')).toContainText(/payment|voucher|الدفع|ڤۆچر/i);
      if (lang.rtl) {
        const dir = await page.getAttribute('html', 'dir');
        expect(dir?.toLowerCase()).toBe('rtl');
      }
      await expect(page.locator('label')).toHaveCountGreaterThan(0);
    });
  }
});
