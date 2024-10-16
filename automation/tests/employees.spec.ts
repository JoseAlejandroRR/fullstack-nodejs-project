import { test, expect } from '@playwright/test';

const HOST = process.env.HOST

test('[EmpoyeesPage] Employee being render on page', async ({ page }) => {
  await page.goto(`${HOST}/employees`)

  const titleContent = page.locator('h2.ant-typography')

  await titleContent.waitFor()

  const titleCheck = await titleContent.textContent()

  await page.waitForTimeout(500)

  const cards = await page.locator('.employees-page-content .employee-card').all()

  expect(cards.length > 0).toBe(true)
  expect(titleCheck).toBe('Employees')
});

test('[EmpoyeesPage] Navigate in random Employee', async ({ page }) => {
  await page.goto(`${HOST}/employees`)

  await page.waitForTimeout(500)

  const cards = await page.locator('.employees-page-content .employee-card').all()

  const random = Math.abs(Math.ceil(Math.random() * (cards.length-1)))

  const card = cards[random]

  const namesCard = await card.locator('.employee-card-center').textContent()

  await card.locator('button').click()

  const titlePage = page.locator('h2.ant-typography')

  await titlePage.waitFor()
  
  const checkTitleName = await titlePage.textContent()

  await page.waitForTimeout(500)

  expect(namesCard).toContain(checkTitleName)
})

test('[EmpoyeesPage] Deleting random Employee', async ({ page }) => {
  await page.goto(`${HOST}/employees`)

  await page.waitForTimeout(500)

  let cards = await page.locator('.employees-page-content .employee-card').all()
  const initialEmployees = cards.length
  const random = Math.abs(Math.ceil(Math.random() * (cards.length-1)))

  const card = cards[random]
  
  await card.locator('.menu-actions span').click()
  
  await page.locator('.ant-dropdown .ant-dropdown-menu li').nth(1).click()
  
  await page.waitForTimeout(100)
  
  await page.locator('.ant-popover .ant-popover-content button').nth(1).click()

  await page.waitForTimeout(1000)

  const afterEmployees = (await page.locator('.employees-page-content .employee-card').all()).length

  expect(afterEmployees).toBe(initialEmployees-1)
});

