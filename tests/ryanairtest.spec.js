import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Navegando ao site 
  await page.goto('https://www.ryanair.com/pt/pt');
  await page.getByRole('button', { name: 'Sim, concordo' }).click();
  // Selecionando destino
  await page.getByPlaceholder('Destino').click();
  await page.getByRole('button', { name: 'Itália' }).click();
  await page.getByRole('button', { name: 'Milão (Todos os aeroportos)' }).click();
  // Selecionando data da viagem 
  await page.getByText('ago.').first().click();
  await page.getByText('9', { exact: true }).first().click();
  await page.getByText('11').first().click();
  await page.getByLabel('Feito').click();
  await page.getByLabel('Pesquisar').click();
  // Escolhendo as passagens
  await page.locator('flight-card-summary').filter({ hasText: 'Tarifa Basic 105,25 €' }).getByRole('button').click();
  await page.locator('flight-card-summary').filter({ hasText: 'Tarifa Basic 138,72 €' }).getByRole('button').click();
  // Selecionando opção de viagem sem bagagem extra
  await expect(page.getByRole('columnheader', { name: 'Image that represents standard fare Basic Viaja sem peso Continuar para  € 243 ,' }).locator('div').nth(4)).toBeVisible();
  await page.getByRole('columnheader', { name: 'Image that represents standard fare Basic Viaja sem peso Continuar para  € 243 ,' }).locator('div').nth(4).click();
  await expect(page.getByText('BasicViaja sem peso')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continuar com Basic' })).toBeVisible();
  await page.getByRole('button', { name: 'Continuar com Basic' }).click();
  // Iniciando sessão mais tarde
  await expect(page.getByRole('button', { name: 'Iniciar sessão mais tarde' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar sessão mais tarde' }).click();
  // Inserindo dados de nome
  await page.getByRole('button', { name: '-', exact: true }).click();
  await page.getByRole('button', { name: 'Sr.', exact: true }).click();
  await page.getByLabel('Nome próprio').fill('Rafael');
  await page.getByLabel('Apelido').fill('Oliveira');
  await page.getByRole('button', { name: 'Continuar' }).click();
  // Negando adicionais de viagem 
  await page.locator('bags-small-bag-pax-control label').click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  // Selecionando lugar recomendando no avião 
  await page.getByRole('button', { name: 'Adicionar lugares recomendados' }).click();
  // Negando adicionais de viagem 
  await page.getByRole('button', { name: 'Não, obrigado' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click();
  // Assertions para Pop-Up de Login
  await expect(page.frameLocator('#ry-modal-portal iframe').locator('svg').first()).toBeVisible();
  await expect(page.frameLocator('#ry-modal-portal iframe').getByRole('heading')).toContainText('Início de sessão na conta');
  await expect(page.frameLocator('#ry-modal-portal iframe').locator('social-login')).toContainText('Continuar com o Google');
  await expect(page.frameLocator('#ry-modal-portal iframe').locator('social-login')).toContainText('Continuar com o Facebook');
  await expect(page.frameLocator('#ry-modal-portal iframe').locator('social-login')).toContainText('Continuar com PayPal');
  await expect(page.frameLocator('#ry-modal-portal iframe').getByRole('button', { name: 'Entrar' })).toBeVisible();
  await expect(page.frameLocator('#ry-modal-portal iframe').getByPlaceholder('email@email.com')).toBeVisible();
  await expect(page.frameLocator('#ry-modal-portal iframe').getByPlaceholder('Palavra-passe')).toBeVisible();
  await expect(page.frameLocator('#ry-modal-portal iframe').getByRole('button', { name: 'Esqueceste-te da password?' })).toBeVisible();
  await expect(page.frameLocator('#ry-modal-portal iframe').getByText('Não tens uma conta? Registo')).toBeVisible(); 
});