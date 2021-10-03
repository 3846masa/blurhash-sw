if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/blurhash-sw/sw.js', { scope: '/blurhash-sw/' })
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
