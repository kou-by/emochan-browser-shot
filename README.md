# emochan browser shot

[![CI][ci-image]][ci-url]
[![npm][npm-image]][npm-url]

[ci-image]: https://github.com/kou-by/emochan-browser-shot/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/kou-by/emochan-browser-shot/actions
[npm-image]: https://img.shields.io/npm/v/emochan-browser-shot.svg
[npm-url]: https://npmjs.org/package/emochan-browser-shot


generate dynamic images via chrome-aws-lambda

## Usage

```ts
import { getScreenshot } from 'emochan-browser-shot';

const capture = await getScreenshot(htmlString, {
  width: 1920,
  height: 1008,
  deviceScaleFactor: 1,
});
```
