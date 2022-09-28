# BlurHash SW

<img
  src="./assets/banner.jpg"
  alt="BlurHash SW"
  data-hidden
/>

<!--
<div
  class="image-wrapper"
  style="
    width: -moz-fit-content;
    width: fit-content;
    background-color: #5A5E64;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto 16px;
  "
  data-blurhash="LKBg9{^jWBWV.Twwj[of57IUs:of"
>
  <img
    src="https://deelay.me/1000/https://3846masa.github.io/blurhash-sw/assets/banner.jpg"
    alt="BlurHash SW"
    width="1200"
    height="630"
    style="
      width: 600px;
      height: auto;
      margin: auto;
      opacity: 0;
      transition: ease-out 0.3s opacity;
    "
    onload="this.style.opacity=1"
    loading="lazy"
  />
</div>
-->

[![npm](https://flat.badgen.net/npm/v/blurhash-sw)](https://www.npmjs.com/package/blurhash-sw)
[![filesize](https://flat.badgen.net/badgesize/gzip/file-url/unpkg.com/blurhash-sw@1.0.10/dist/index.js)](https://unpkg.com/blurhash-sw@1.0.10/dist/index.js)
[![license](https://flat.badgen.net/badge/license/MIT/blue)](https://3846masa.mit-license.org)
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
importScripts('https://unpkg.com/blurhash-sw@1.0.10/dist/index.js');

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

Set the BlurHash URL as `background-image`.

You should encode the BlurHash hash contained in the URL.

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
  src="https://deelay.me/3000/https://source.unsplash.com/alY6_OpdwRQ/793x529"
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
    margin: auto;
  "
  loading="lazy"
/>
-->

### With fade-in transition

Wrap the img element in the div element.

The BlurHash URL should be assigned as `background-image` of the div element.

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
    margin: auto;
  "
>
  <img
    src="https://deelay.me/3000/https://source.unsplash.com/7H77FWkK_x4/472x512"
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

### Using `data-blurhash` attribute

The BlurHash URL is not available until the ServiceWorker is ready.

Therefore, when visiting the site for the first time, `background-image` cannot be loaded.

As a workaround, generate `background-image` based on `data-blurhash` when the ServiceWorker is ready.

```js
navigator.serviceWorker
  .register('/sw.js')
  .then(() => navigator.serviceWorker.ready)
  .then(() => {
    const $elemList = document.querySelectorAll('[data-blurhash]');
    for (const $elem of $elemList) {
      const blurhash = $elem.dataset.blurhash;
      $elem.style.backgroundSize = `100% 100%`;
      $elem.style.backgroundImage = `url(/.blurhash/${encodeURIComponent(blurhash)})`;
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
  src="https://deelay.me/3000/https://source.unsplash.com/HkGaG67usNE/597x398"
  alt="Kinkaku-ji"
  width="597"
  height="398"
  style="
    width: 400px;
    height: auto;
    background-color: #0c8cd9;
    color: transparent;
    margin: auto;
  "
  loading="lazy"
  data-blurhash="L%C%zEXANengKnkCj]n$NMjXsoW?"
/>
-->

```html
<div
  style="
    width: fit-content;
  "
  data-blurhash="LmF~daR+NGWA_4RjRjWBkCadV@W;"
>
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
    width: -moz-fit-content;
    width: fit-content;
    background-color: #262626;
    margin: auto;
  "
  data-blurhash="LmF~daR+NGWA_4RjRjWBkCadV@W;"
>
  <img
    src="https://deelay.me/3000/https://source.unsplash.com/wPMvPMD9KBI/262x394"
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

[MIT (c) 3846masa](https://3846masa.mit-license.org)
