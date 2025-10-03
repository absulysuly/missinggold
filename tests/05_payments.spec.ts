import { test } from './fixtures';
import { expect } from '@playwright/test';

const providers = [
  { name: 'FAST PAY', flow: 'mobile_otp' },
  { name: 'QI Card', flow: 'redirect' },
  { name: 'FIB', flow: 'redirect' },
  { name: 'Bank Transfer', flow: 'receipt' },
  { name: 'COD', flow: 'cod' },
  { name: 'Voucher', flow: 'voucher' }
];

test.describe('payments & voucher flows', () => {
  test.use({ role: 'user' });

  for (const p of providers) {
    test(`provider: ${p.name}`, async ({ rolePage }) => {
      await rolePage.goto('/payments/checkout');
      await rolePage.getByRole('button', { name: new RegExp(p.name, 'i') }).click();

      switch (p.flow) {
        case 'mobile_otp':
          await rolePage.getByLabel(/mobile/i).fill('0700000000');
          await rolePage.getByRole('button', { name: /send otp/i }).click();
          await rolePage.getByLabel(/otp/i).fill('123456');
          await rolePage.getByRole('button', { name: /pay|confirm|continue/i }).click();
          break;
        case 'redirect':
          await rolePage.getByRole('button', { name: /pay|continue|redirect/i }).click();
          await rolePage.goto('/payments/callback/success?provider=' + encodeURIComponent(p.name));
          break;
        case 'receipt':
          await rolePage.setInputFiles('input[type="file"]', 'tests/fixtures/sample-receipt.png');
          await rolePage.getByRole('button', { name: /submit|upload/i }).click();
          break;
        case 'cod':
          await rolePage.getByRole('button', { name: /place order/i }).click();
          break;
        case 'voucher':
          await rolePage.getByLabel(/voucher code/i).fill('DEMO-123-ABC');
          await rolePage.getByRole('button', { name: /apply/i }).click();
          break;
      }

      await expect(rolePage.locator('body')).toContainText(/success|paid|pending review|awaiting confirmation|applied/i);
    });
  }
});
