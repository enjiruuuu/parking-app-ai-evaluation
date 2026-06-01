import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// Seed for determinism across test runner cycles
faker.seed(2026);

test.describe('Community Reporting Application - Anonymized Functional Scope Verification', () => {
  
  // 1. Generate strictly anonymous identifiers to maintain isolation & compliance
  // Generates formats like "User_X" using a single uppercase alphanumeric character
  // Added timestamp to ensure uniqueness across test runs and prevent race conditions
  const timestamp = Date.now();
  const newUserName = `User_${faker.string.alpha({ length: 1, casing: 'upper' })}_New_${timestamp}`;
  const existingUserName = `User_${faker.string.alpha({ length: 1, casing: 'upper' })}_Existing_${timestamp}`;

  test.beforeAll(async () => {
    // Create the existing user before all tests run
    await fetch('http://localhost:3000/photo/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid: existingUserName })
    });
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ==========================================
  // 1. REGISTRATION & AUTHENTICATION FLOWS
  // ==========================================
  
  test('Authentication - New User Registration Flow', async ({ page }) => {
    const nameInput = page.getByTestId('username-input');
    const loginButton = page.getByTestId('login-button');

    await nameInput.fill(newUserName);
    await loginButton.click();

    const alertMessage = page.getByTestId('alert-message');
    await expect(alertMessage).toContainText('A new account has been created for you.');
    
    await expect(page.getByText(`Logged in as: ${newUserName}`)).toBeVisible();
  });

  test('Authentication - Existing User Login Flow', async ({ page }) => {
    const nameInput = page.getByTestId('username-input');
    const loginButton = page.getByTestId('login-button');

    await nameInput.fill(existingUserName);
    await loginButton.click();

    await expect(page.getByTestId('alert-message')).toContainText('Welcome back!');
    await expect(page.getByText(`Logged in as: ${existingUserName}`)).toBeVisible();
  });

  // ==========================================
  // 2. REPORT MANAGEMENT FLOWS
  // ==========================================

  test('Reports - Create Report with Image Upload', async ({ page }) => {
    await page.getByTestId('username-input').fill(existingUserName);
    await page.getByTestId('login-button').click();

    await page.getByTestId('create-report-button').click();

    const titleInput = page.getByTestId('report-title-input');
    const randomTitle = `Report_${faker.string.alphanumeric({ length: 5, casing: 'upper' })}`;
    await titleInput.fill(randomTitle);

    await page.setInputFiles('[data-testid="file-input"]', {
      name: 'incident_image.png',
      mimeType: 'image/png',
      buffer: Buffer.from('89504E470D0A1A0A0000000D49484452', 'hex'),
    });

    await page.getByTestId('submit-report-button').click();

    const reportList = page.getByTestId('reports-list');
    await expect(reportList).toContainText(randomTitle);
  });

  test('Reports - View List of Existing Reports', async ({ page }) => {
    await page.getByTestId('username-input').fill(existingUserName);
    await page.getByTestId('login-button').click();

    const reportDashboard = page.getByTestId('reports-list');
    await expect(reportDashboard).toBeVisible();

    const reportCards = page.getByTestId('report-card');
    await expect(reportCards.first()).toBeVisible();
  });

  // ==========================================
  // 3. INTERACTION & SOCIAL FEATURES
  // ==========================================

  test('Interactions - Vote on a Report', async ({ page }) => {
    await page.getByTestId('username-input').fill(existingUserName);
    await page.getByTestId('login-button').click();

    const firstReportCard = page.getByTestId('report-card').first();
    const voteButton = firstReportCard.getByTestId('vote-button');
    const voteCounter = firstReportCard.locator('.vote-count');

    const initialVotesText = await voteCounter.innerText();
    const initialVotes = parseInt(initialVotesText, 10) || 0;

    await voteButton.click();

    await expect(voteCounter).toHaveText((initialVotes + 1).toString());
  });

  test('Interactions - Add and View Comments on a Report', async ({ page }) => {
    const mockComment = `Comment_${faker.string.alphanumeric({ length: 8 })}_Anonymized`;
    
    await page.getByTestId('username-input').fill(existingUserName);
    await page.getByTestId('login-button').click();

    await page.getByTestId('report-card').first().getByTestId('view-details-button').click();

    const commentInput = page.getByTestId('comment-input');
    const postButton = page.getByTestId('post-comment-button');

    await commentInput.fill(mockComment);
    await postButton.click();

    const commentsSection = page.getByTestId('comments-list');
    await expect(commentsSection).toContainText(mockComment);
  });
});