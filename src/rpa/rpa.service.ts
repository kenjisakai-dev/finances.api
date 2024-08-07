import { Injectable } from '@nestjs/common';
import { Browser, chromium, Page } from 'playwright';
import config from '../config/environment';

@Injectable()
export class RpaService {
  private browser: Browser;
  private page: Page;

  constructor() {}

  async extractFile() {
    await this.createPage();
    await this.login();
    const path = await this.downloadFile();
    await this.browser.close();
    return path;
  }

  private async createPage() {
    this.browser = await chromium.launch({
      headless: false,
      channel: 'msedge',
      args: ['--disable-blink-features=AutomationControlled'],
    });

    this.page = await this.browser.newPage();
    await this.page.goto('https://login.microsoftonline.com/');
  }

  private async login() {
    await this.page.fill('input[type="email"]', config.email);
    await this.page.click('input[type="submit"]');

    await this.page.getByText('Outras maneiras de entrar').click();
    await this.page.getByText('Usar minha senha').click();
    await this.page.fill('input[type="password"]', config.pass);
    await this.page.click('button[type="submit"]');

    await this.page.click('button[type="submit"]');
  }

  private async downloadFile() {
    await this.page.goto(
      'https://onedrive.live.com/?id=3D19C861C5F082B3%2121500&cid=3D19C861C5F082B3',
    );

    await this.page.waitForLoadState('networkidle');

    const files = await this.page
      .locator('.ms-TilesList-grid > div > div')
      .elementHandles();

    let fileElement = null;

    for (let file of files) {
      const name = await file.textContent();

      if (name.includes(`Base.xlsx`)) {
        fileElement = file;
        break;
      }
    }

    if (!fileElement) {
      throw new Error('Arquivo não encontrado.');
    }

    const downloadPromise = this.page.waitForEvent('download');
    await fileElement.click({ button: 'right' });
    await this.page.getByText('Baixar').click();
    const download = await downloadPromise;

    const path = `./downloads/${download.suggestedFilename()}`;
    await download.saveAs(path);

    return path;
  }
}
