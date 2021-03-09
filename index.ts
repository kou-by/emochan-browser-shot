import core from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

const exePath = ((p: NodeJS.Platform) => {
  if (p === 'linux') return '/usr/bin/google-chrome-stable';
  if (p === 'win32') return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';

  return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
})(process.platform);

export async function launchBrowser(): Promise<core.Browser> {
  try {
    return await core.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
  } catch (_) {
    return await core.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: exePath,
      headless: true
    })
  }
}

export async function getScreenShot(html: string, viewport: core.Viewport): Promise<string | void | Buffer> {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    await page.setViewport(viewport);
    await page.setContent(html);

    return await page.screenshot();
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    await browser.close();
  }
}
