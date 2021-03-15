import path from 'path';
import { promises as fs } from 'fs';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { getScreenshot } from '../index';

expect.extend({ toMatchImageSnapshot });

describe('.getScreenshot()', (): void => {
  it('generates an image from HTML/CSS', async (): Promise<void> => {
    const htmlString = await fs.readFile(path.resolve(__dirname, './index.html'), 'utf-8');

    const imageData = await getScreenshot(htmlString, {
      width: 375,
      height: 640,
      deviceScaleFactor: 1,
    });

    expect(imageData).toMatchImageSnapshot({
      failureThreshold: 0.07,
      failureThresholdType: 'percent'
    });
  });
});
