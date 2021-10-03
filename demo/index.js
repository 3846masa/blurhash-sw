if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => {
      const $imgList = document.querySelectorAll('img[data-blurhash]');
      for (const $img of $imgList) {
        const blurhash = $img.dataset.blurhash;
        $img.style.backgroundSize = `100% 100%`;
        $img.style.backgroundImage = `url(/.blurhash/${encodeURIComponent(blurhash)})`;
      }
    });
}
