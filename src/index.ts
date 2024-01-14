import { parse } from 'regexparam';
import { decode, isBlurhashValid } from 'blurhash';
import { convert } from '@3846masa/bmp';

type BlurhashSWOptions = {
  routeUrl: string;
  width: number;
  height: number;
};

function blurhashSW({ routeUrl, width, height }: BlurhashSWOptions): void {
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
    if (matches === null) {
      return;
    }

    const blurhash = decodeURIComponent(matches[keyIndex + 1] ?? '');
    const { result: isValid, errorReason } = isBlurhashValid(blurhash);

    if (!isValid) {
      return ev.respondWith(new Response(errorReason, { status: 400 }));
    }

    const buffer = convert({
      data: decode(blurhash, width, height),
      width,
      height,
    });

    return ev.respondWith(
      new Response(buffer, {
        status: 200,
        headers: { 'content-type': 'image/bmp' },
      }),
    );
  }

  self.addEventListener('fetch', handler);
}

export type { BlurhashSWOptions };
export { blurhashSW };
