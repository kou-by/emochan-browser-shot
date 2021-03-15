import core from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';
import { lookpath } from 'lookpath';

export async function tryLookpath(list: string[]) {
  for (const p of list) {
    const result = await lookpath(p);

    if (result !== undefined) return result;
  }

  return null;
}

export async function findExePath(p: NodeJS.Platform) {
  if (p === 'linux') {
    const r = await tryLookpath([
      'google-chrome-stable',
      'google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-beta',
      '/usr/bin/google-chrome-unstable',
    ]);

    if (r === null) {
      throw new Error(`could not find executable Chrome Path: ${p}`);
    }
  }

  if (p === 'win32') {
    const r = await tryLookpath([
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    ]);

    if (r === null) {
      throw new Error(`could not find executable Chrome Path: ${p}`);
    }
  }

  if (p === 'darwin') {
    const r = await tryLookpath([
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    ]);

    if (r === null) {
      throw new Error(`could not find executable Chrome Path: ${p}`);
    }
  }

  // TODO: cygwin or other platforms
  return 'google-chrome';
}

export async function launchBrowser(): Promise<core.Browser> {
  try {
    return await core.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    })
  } catch (_) {
    const exePath = await findExePath(process.platform);

    return await core.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: exePath,
      headless: true
    })
  }
}
/**
 * @deprecated please use getScreenshot()
 */
export async function getScreenShot(html: string, viewport: core.Viewport): Promise<string | void | Buffer> {
  return getScreenshot(html, viewport);
}

export async function getScreenshot(html: string, viewport: core.Viewport): Promise<string | void | Buffer> {
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
