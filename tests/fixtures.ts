import { test as base, expect, Page } from '@playwright/test';

export type Role = 'admin' | 'business_owner' | 'user';
export type TestFixtures = { rolePage: Page; role: Role };

export const test = base.extend<TestFixtures>({
  role: ['user', { option: true }],
  rolePage: async ({ browser, baseURL, role }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${baseURL}/auth/signin`);
    const credsMap: Record<string, { email: string; password: string }> = {
      admin: { email: process.env.ADMIN_EMAIL!, password: process.env.ADMIN_PASSWORD! },
      business_owner: { email: process.env.OWNER_EMAIL!, password: process.env.OWNER_PASSWORD! },
      user: { email: process.env.USER_EMAIL!, password: process.env.USER_PASSWORD! }
    };
    const { email, password } = credsMap[role];

    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.waitForURL('**/*', { timeout: 15_000 });
    await use(page);
    await context.close();
  }
});

export const expectRoleGate = async (page: Page, allowed: boolean) => {
  if (allowed) {
    await expect(page.locator('body')).not.toContainText(/unauthorized|forbidden|sign in/i);
  } else {
    await expect(page.locator('body')).toContainText(/unauthorized|forbidden|sign in/i);
  }
};
