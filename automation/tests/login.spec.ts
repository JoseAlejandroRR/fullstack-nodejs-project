import { test, expect } from '@playwright/test'

const HOST = process.env.HOST


test('[LoginPage] invalid Credentials', async ({ page }) => {
  await page.goto(`${HOST}/login`)

  const emailField =  page.locator('#employee-form_email')
  await emailField.fill('josealejandror28@gmail.com')

  const passwordField = page.locator('#employee-form_password')
  await passwordField.fill('12345')

  const submitBtn =  page.locator('button[type="submit"]')
  await submitBtn.click()

  await page.waitForTimeout(1000)

  await page.locator('h4.ant-typography').waitFor()

  const checkText = await page.locator('h4.ant-typography').textContent()

  expect(checkText).toBe('Invalid Credentials')
})

test('[LoginPage] Login Success ', async ({ page }) => {
  await page.goto(`${HOST}/login`)

  const emailField =  page.locator('#employee-form_email')
  await emailField.fill('josealejandror28@gmail.com')

  const passwordField = page.locator('#employee-form_password')
  await passwordField.fill('123456')

  const submitBtn =  page.locator('button[type="submit"]')
  await submitBtn.click()

  await page.waitForTimeout(1000)

  const titleContent = page.locator('h2.ant-typography')

  await titleContent.waitFor()

  const checkText = await titleContent.textContent()

  expect(checkText).toBe('Dashboard')
});

