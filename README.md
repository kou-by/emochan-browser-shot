# emochan browser shot

[![CI](https://github.com/kou-by/emochan-browser-shot/actions/workflows/ci.yml/badge.svg)](https://github.com/kou-by/emochan-browser-shot/actions/workflows/ci.yml)

generate dynamic images via chrome-aws-lambda

## Usage

```ts
import { getScreenShot } from 'emochan-browser-shot';

const capture = await getScreenShot(htmlString, {
  width: 1920,
  height: 1008,
  deviceScaleFactor: 1,
});
```
