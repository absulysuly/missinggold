import { test } from './fixtures';
import { expect } from '@playwright/test';

test.describe('voucher admin flow', () => {
  test.use({ role: 'admin' });

  test('approve/reject voucher requests', async ({ rolePage }) => {
    await rolePage.goto('/admin');
    await rolePage.getByRole('link', { name: /voucher/i }).click();
    const approve = rolePage.getByRole('button', { name: /approve/i }).first();
    if (await approve.isVisible()) await approve.click();
    const reject = rolePage.getByRole('button', { name: /reject/i }).nth(1);
    if (await reject.isVisible()) await reject.click();
    await expect(rolePage.locator('body')).toContainText(/approved|rejected/i);
  });

  test('reconciliation flow - bank transfer', async ({ rolePage }) => {
    await rolePage.goto('/admin/reconciliation');
    const review = rolePage.getByRole('button', { name: /review/i }).first();
    if (await review.isVisible()) {
      await review.click();
      await rolePage.getByRole('button', { name: /approve|mark paid/i }).click();
      await expect(rolePage.locator('body')).toContainText(/paid|approved/i);
    }
  });
});
