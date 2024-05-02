import { convert } from '@3846masa/bmp';
import { decode, isBlurhashValid } from 'blurhash';
import { parse } from 'regexparam';

type BlurhashSWOptions = {
  height: number;
  routeUrl: string;
  width: number;
};

function blurhashSW({ height, routeUrl, width }: BlurhashSWOptions): void {
  if (!Number.isInteger(width) || !Number.isInteger(height)) {
    throw new Error('width and height should be intergers.');
  }

  const { origin: routeOrigin, pathname: routePath } = new URL(routeUrl, location.href);
  const { keys: routePathKeys, pattern: routePathPattern } = parse(routePath);

  const keyIndex = routePathKeys.indexOf('blurhash');
  if (keyIndex === -1) {
    throw new Error('routeUrl should contain :blurhash param.');
  }

  function handler(ev: FetchEvent): void {
    const { request } = ev;
    if (request.method !== 'GET') {
      return;
    }

    const url = new URL(request.url);
    if (url.origin !== routeOrigin) {
      return;
    }

    const matches = routePathPattern.exec(url.pathname);
    if (matches == null) {
      return;
    }

    const blurhash = decodeURIComponent(matches[keyIndex + 1] ?? '');
    const { errorReason, result: isValid } = isBlurhashValid(blurhash);

    if (!isValid) {
      ev.respondWith(new Response(errorReason, { status: 400 }));
      return;
    }

    const buffer = convert({
      data: decode(blurhash, width, height),
      height,
      width,
    });

    ev.respondWith(
      new Response(buffer, {
        headers: { 'content-type': 'image/bmp' },
        status: 200,
      }),
    );
  }

  self.addEventListener('fetch', handler);
}

export type { BlurhashSWOptions };
export { blurhashSW };
