import {expect, test} from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/NgPress/);
});

test('render default markdown', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading').filter({hasText: 'This is a header'})).toBeVisible();
});

test('should render sub page', async ({page}) => {
  await page.goto('/content/installation');
  const p = page.getByRole('paragraph').filter({hasText: 'Do not touch'});
  await expect(p).toBeVisible();
});
