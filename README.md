# emochan browser shot

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