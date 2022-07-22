const puppeteer = require("puppeteer"); // importe o pacote puppeteer
 
 
let scrape = async () => { // crie uma função assíncrona que irá realizar o scraping
  const browser = await puppeteer.launch({
    headless: false,
  }); // cria um browser. A propriedade headless define se o browser irá abrir com interface gráfica ou se apenas irá executar em segundo plano, sem GUI. false = irá abrir interface gráfica; true = não irá abrir interface gráfica
 
  const page = await browser.newPage(); // cria uma nova aba no navegador acima
 
  await page.goto("https://www.youtube.com/"); 
  // define a página que queremos acessar e a função goto navega até essa página
  
  // Espera o seletor escolhido está disponivel para se utilizado => waitForSelector
  await page.waitForSelector('[class="gsfi ytd-searchbox"]')
  await page.type('[class="gsfi ytd-searchbox"]','Amor marginal')

  await page.waitForSelector('[id="search-icon-legacy"]')
  await page.click('[id="search-icon-legacy"]')

  await page.waitForSelector("div > ytd-thumbnail > a")
  const videos = await page.$$eval('div > ytd-thumbnail > a', (el) => {
    return el.map((a) => a.getAttribute('href'))
  }
  )
  browser.close(); // fecha o browser, indicando que finalizamos o scraping
 
  return videos; // no momento, não desejamos retornar nada. Por isso, return []
};
scrape()
  .then((value) => {
    console.log(value)
  })
  .catch((error) => console.log(error));