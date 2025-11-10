import { test as base, expect } from '@playwright/test';
import { test as roleTest, expectRoleGate } from './fixtures';

base('sign in with demo user works', async ({ page, baseURL }) => {
  await page.goto('/auth/signin');
  await page.getByLabel(/email/i).fill(process.env.USER_EMAIL!);
  await page.getByLabel(/password/i).fill(process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL('**/*');
  await page.goto('/profile');
  await expect(page).toHaveURL(/\/profile/);
});

roleTest.describe('role guards', () => {
  roleTest.use({ role: 'user' });
  roleTest('user cannot access admin', async ({ rolePage }) => {
    await rolePage.goto('/admin');
    await expectRoleGate(rolePage, false);
  });
});

roleTest.describe('business owner access', () => {
  roleTest.use({ role: 'business_owner' });
  roleTest('owner can access campaigns', async ({ rolePage }) => {
    await rolePage.goto('/campaigns');
    await expectRoleGate(rolePage, true);
  });
});

roleTest.describe('admin access', () => {
  roleTest.use({ role: 'admin' });
  roleTest('admin sees dashboard', async ({ rolePage }) => {
    await rolePage.goto('/admin');
    await expectRoleGate(rolePage, true);
  });
});
