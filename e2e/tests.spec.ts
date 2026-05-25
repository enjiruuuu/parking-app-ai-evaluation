import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// Seed for determinism across test runner cycles
faker.seed(2026);

test.describe('Community Reporting Application - Anonymized Functional Scope Verification', () => {
  
  // 1. Generate strictly anonymous identifiers to maintain isolation & compliance
  // Generates formats like "User_X" using a single uppercase alphanumeric character
  const newUserName = `User_${faker.string.alpha({ length: 1, casing: 'upper' })}_New`;
  const existingUserName = `User_${faker.string.alpha({ length: 1, casing: 'upper' })}_Existing`;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ==========================================
  // 1. REGISTRATION & AUTHENTICATION FLOWS
  // ==========================================
  
  test('Authentication - New User Registration Flow', async ({ page }) => {
    const nameInput = page.getByLabel('Username');
    const loginButton = page.getByRole('button', { name: 'Log In' });

    await nameInput.fill(newUserName);
    await loginButton.click();

    const alertMessage = page.getByRole('alert');
    await expect(alertMessage).toContainText('A new account has been created for you.');
    
    await expect(page.getByText(`Logged in as: ${newUserName}`)).toBeVisible();
  });

  test('Authentication - Existing User Login Flow', async ({ page }) => {
    const nameInput = page.getByLabel('Username'); 
    const loginButton = page.getByRole('button', { name: 'Log In' });

    await nameInput.fill(existingUserName);
    await loginButton.click();

    await expect(page.getByRole('alert')).not.toBeAttached();
    await expect(page.getByText(`Logged in as: ${existingUserName}`)).toBeVisible();
  });

  // ==========================================
  // 2. REPORT MANAGEMENT FLOWS
  // ==========================================

  test('Reports - Create Report with Image Upload', async ({ page }) => {
    await page.getByLabel('Enter your name').fill(existingUserName);
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('button', { name: 'Create New Report' }).click();

    const titleInput = page.getByLabel('Report Title');
    const randomTitle = `Report_${faker.string.alphanumeric({ length: 5, casing: 'upper' })}`;
    await titleInput.fill(randomTitle);

    await page.setInputFiles('input[type="file"]', {
      name: 'incident_image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('89504E470D0A1A0A0000000D49484452', 'hex'),
    });

    await page.getByRole('button', { name: 'Submit Report' }).click();

    const reportList = page.getByRole('list', { name: 'Community Reports' });
    await expect(reportList).toContainText(randomTitle);
  });

  test('Reports - View List of Existing Reports', async ({ page }) => {
    await page.getByLabel('Enter your name').fill(existingUserName);
    await page.getByRole('button', { name: 'Log In' }).click();

    const reportDashboard = page.getByRole('list', { name: 'Community Reports' });
    await expect(reportDashboard).toBeVisible();

    const reportCards = page.locator('.report-card');
    await expect(reportCards.first()).toBeVisible();
  });

  // ==========================================
  // 3. INTERACTION & SOCIAL FEATURES
  // ==========================================

  test('Interactions - Vote on a Report', async ({ page }) => {
    await page.getByLabel('Enter your name').fill(existingUserName);
    await page.getByRole('button', { name: 'Log In' }).click();

    const firstReportCard = page.locator('.report-card').first();
    const voteButton = firstReportCard.getByRole('button', { name: 'Vote' });
    const voteCounter = firstReportCard.locator('.vote-count');

    const initialVotesText = await voteCounter.innerText();
    const initialVotes = parseInt(initialVotesText, 10) || 0;

    await voteButton.click();

    await expect(voteCounter).toHaveText((initialVotes + 1).toString());
  });

  test('Interactions - Add and View Comments on a Report', async ({ page }) => {
    const mockComment = `Comment_${faker.string.alphanumeric({ length: 8 })}_Anonymized`;
    
    await page.getByLabel('Enter your name').fill(existingUserName);
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.locator('.report-card').first().getByRole('button', { name: 'View Details' }).click();

    const commentInput = page.getByLabel('Add a comment');
    const postButton = page.getByRole('button', { name: 'Post Comment' });

    await commentInput.fill(mockComment);
    await postButton.click();

    const commentsSection = page.getByRole('list', { name: 'User Comments' });
    await expect(commentsSection).toContainText(mockComment);
  });
});