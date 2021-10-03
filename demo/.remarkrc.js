import { raw } from 'hast-util-raw';

export default {
  plugins: [
    'remark-emoji',
    ['remark-rehype', { allowDangerousHtml: true }],
    'rehype-raw',
    [
      'rehype-rewrite',
      {
        rewrite: (node, index, parent) => {
          if (node.type === 'comment') {
            const parsed = raw({ type: 'raw', value: node.value });
            parent.children.splice(index, 1, ...parsed.children);
          }
        },
      },
    ],
    '@mapbox/rehype-prism',
    ['rehype-wrap', { wrapper: 'div.markdown-body' }],
    [
      'rehype-document',
      {
        css: ['./styles.css'],
        js: ['./index.js'],
      },
    ],
    [
      'rehype-meta',
      {
        twitter: true,
        og: true,
        title: 'BlurHash SW',
        description: 'The BlurHash API provided by ServiceWorker',
        image: {
          url: 'https://3846masa.github.io/blurhash-sw/assets/banner.jpg',
          width: 1200,
          height: 630,
        },
        origin: 'https://3846masa.github.io',
        pathname: '/blurhash-sw/',
      },
    ],
    'rehype-preset-minify',
    'rehype-stringify',
  ],
};
