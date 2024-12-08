if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => {
      const $elemList = document.querySelectorAll('[data-blurhash]');
      for (const $elem of $elemList) {
        const blurhash = $elem.dataset.blurhash;
        $elem.style.backgroundSize = `100% 100%`;
        $elem.style.backgroundImage = `url(/.blurhash/${encodeURIComponent(blurhash)})`;
      }
    });
}
