module.exports = {
  plugins: [
    'remark-emoji',
    ['remark-rehype', { allowDangerousHtml: true }],
    'rehype-raw',
    [
      'rehype-rewrite',
      {
        rewrite: (node, index, parent) => {
          if (node.type === 'element' && node.tagName === 'template') {
            parent.children.splice(index, 1, ...node.content.children);
          }
        },
      },
    ],
    '@mapbox/rehype-prism',
    ['rehype-wrap', { wrapper: 'div.markdown-body' }],
    [
      'rehype-document',
      {
        title: 'BlurHash SW - The BlurHash API provided by ServiceWorker',
        css: ['./styles.css'],
        js: ['./index.js'],
      },
    ],
    'rehype-preset-minify',
    'rehype-stringify',
  ],
};
