# BlurHash SW

<img
  src="./assets/banner.jpg"
  alt="BlurHash SW"
  data-hidden
/>

<!--
<img
  src="./assets/banner.jpg"
  alt="BlurHash SW"
  width="1200"
  height="630"
  style="
    width: 600px;
    height: auto;
    background-color: #5A5E64;
    background-size: 100% 100%;
    background-image: url(/.blurhash/LKBg9%7B%5EjWBWV.Twwj%5Bof57IUs%3Aof);
    color: transparent;
    border-radius: 8px;
  "
  loading="lazy"
/>
-->

[![npm](https://flat.badgen.net/npm/v/blurhash-sw)](https://www.npmjs.com/package/blurhash-sw)
[![license](https://flat.badgen.net/badge/license/MIT/blue)](./LICENSE)
[![standard-readme compliant](https://flat.badgen.net/badge/readme%20style/standard/green)](https://github.com/RichardLitt/standard-readme)

The BlurHash API provided by ServiceWorker.

[https://github.com/3846masa/blurhash-sw](https://github.com/3846masa/blurhash-sw)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

Add the following code to your ServiceWorker script.

```js
// sw.js
importScripts('https://unpkg.com/blurhash-sw@0.0.0');

blurhashSW({
  routeUrl: '/.blurhash/:blurhash',
  width: 32,
  height: 32,
});
```

```html
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
```

## Usage

See also [demo page](https://3846masa.github.io/blurhash-sw/).

### The easiest way

Set the BlurHash URL as background-image.

:warning: The BlurHash URL will be available after the ServiceWorker is ready.
Therefore, it will not work properly the first time you access the site.

```html
<img
  src="https://source.unsplash.com/alY6_OpdwRQ/793x529"
  alt="Shibuya 109"
  width="793"
  height="529"
  style="
    background-size: 100% 100%;
    background-image: url(/.blurhash/LGBEE%2CIr.At8t8IU-%3DR%2BR6R4OrIo);
  "
  loading="lazy"
/>
```

<!--
<img
  src="https://deelay.me/5000/https://source.unsplash.com/alY6_OpdwRQ/793x529"
  alt="Shibuya 109"
  width="793"
  height="529"
  style="
    width: 400px;
    height: auto;
    background-color: #0c5973;
    background-size: 100% 100%;
    background-image: url(/.blurhash/LGBEE%2CIr.At8t8IU-%3DR%2BR6R4OrIo);
    color: transparent;
  "
  loading="lazy"
/>
-->

### Using `data-blurhash` attribute

Set the BlurHash to `data-blurhash` for waiting until the ServiceWorker is ready.

When the ServiceWorker is ready, set `background-image` based on `data-blurhash`.

```js
navigator.serviceWorker
  .register('/sw.js')
  .then(() => navigator.serviceWorker.ready)
  .then(() => {
    const $imgList = document.querySelectorAll('img[data-blurhash]');
    for (const $img of $imgList) {
      const blurhash = $img.dataset.blurhash;
      $img.style.backgroundSize = `100% 100%`;
      $img.style.backgroundImage = `url(/.blurhash/${encodeURIComponent(blurhash)})`;
    }
  });
```

```html
<img
  src="https://source.unsplash.com/HkGaG67usNE/597x398"
  alt="Kinkaku-ji"
  width="597"
  height="398"
  loading="lazy"
  data-blurhash="L%C%zEXANengKnkCj]n$NMjXsoW?"
/>
```

<!--
<img
  src="https://deelay.me/5000/https://source.unsplash.com/HkGaG67usNE/597x398"
  alt="Kinkaku-ji"
  width="597"
  height="398"
  style="
    width: 400px;
    height: auto;
    background-color: #0c8cd9;
    color: transparent;
  "
  loading="lazy"
  data-blurhash="L%C%zEXANengKnkCj]n$NMjXsoW?"
/>
-->

### With fade-in transition

Wrap an img element in a div element with the BlurHash URL.

```html
<div
  style="
    width: fit-content;
    background-size: 100% 100%;
    background-image: url(/.blurhash/LKF%23tH-psS%2C%3F3%3FoJWVNbIVs.%24*n%24);
  "
>
  <img
    src="https://source.unsplash.com/7H77FWkK_x4/472x512"
    alt="Tokyo tower"
    width="472"
    height="512"
    style="
      opacity: 0;
      transition: ease-out 0.3s opacity;
    "
    onload="this.style.opacity=1"
    loading="lazy"
  />
</div>
```

<!--
<div
  class="image-wrapper"
  style="
    width: -moz-fit-content;
    width: fit-content;
    background-color: #0c738c;
    background-size: 100% 100%;
    background-image: url(/.blurhash/LKF%23tH-psS%2C%3F3%3FoJWVNbIVs.%24*n%24);
  "
>
  <img
    src="https://deelay.me/5000/https://source.unsplash.com/7H77FWkK_x4/472x512"
    alt="Tokyo tower"
    width="472"
    height="512"
    style="
      width: 300px;
      height: auto;
      opacity: 0;
      transition: ease-out 0.3s opacity;
    "
    onload="this.style.opacity=1"
    loading="lazy"
  />
</div>
-->

### Lazy-loading BlurHash image

To delay creating the BlurHash image, load the BlurHash URL in an img element.

```html
<div
  style="
    position: relative;
    width: fit-content;
    z-index: 0;
  "
>
  <img
    src="/.blurhash/LmF~daR%2BNGWA_4RjRjWBkCadV%40W%3B"
    alt=""
    width="32"
    height="32"
    style="
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: fill;
      z-index: -1;
    "
    loading="lazy"
    aria-hidden="true"
  />
  <img
    src="https://source.unsplash.com/wPMvPMD9KBI/262x394"
    alt="Himeji castle"
    width="262"
    height="394"
    style="
      opacity: 0;
      transition: ease-out 0.3s opacity;
    "
    onload="this.style.opacity=1"
    loading="lazy"
  />
</div>
```

<!--
<div
  class="image-wrapper"
  style="
    position: relative;
    width: -moz-fit-content;
    width: fit-content;
    background-color: #262626;
    z-index: 0;
  "
>
  <img
    src="/.blurhash/LmF~daR%2BNGWA_4RjRjWBkCadV%40W%3B"
    alt=""
    width="32"
    height="32"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      z-index: -1;
    "
    loading="lazy"
    aria-hidden="true"
  />
  <img
    src="https://deelay.me/5000/https://source.unsplash.com/wPMvPMD9KBI/262x394"
    alt="Himeji castle"
    width="262"
    height="394"
    style="
      width: 300px;
      height: auto;
      opacity: 0;
      transition: ease-out 0.3s opacity;
    "
    onload="this.style.opacity=1"
    loading="lazy"
  />
</div>
-->

## Contributing

PRs accepted.

## License

[MIT (c) 3846masa](./LICENSE)
