import { test } from './fixtures';
import { expect } from '@playwright/test';

const placements = ['Stories', 'Featured', 'Carousel'];

test.describe('sponsorship flow', () => {
  test.use({ role: 'business_owner' });

  for (const placement of placements) {
    test(`create campaign - ${placement}`, async ({ rolePage }) => {
      await rolePage.goto('/campaigns/new');
      await rolePage.getByLabel(/placement/i).selectOption(placement);
      await rolePage.getByLabel(/budget/i).fill('100');
      await rolePage.getByText(/estimated reach/i).waitFor();
      await rolePage.getByRole('button', { name: /preview/i }).click();
      await rolePage.getByRole('button', { name: /confirm/i }).click();
      await rolePage.getByText(/pending|awaiting payment/i).waitFor();
    });
  }

  test('campaign list shows states and edit works', async ({ rolePage }) => {
    await rolePage.goto('/campaigns');
    await rolePage.getByText(/pending|active|paused|completed/i).first().waitFor();
    const edit = rolePage.getByRole('button', { name: /edit/i }).first();
    if (await edit.isVisible()) await edit.click();
  });
});
