import flatMap from 'unist-util-flatmap';
import { remove } from 'unist-util-remove';
import { raw } from 'hast-util-raw';

const remarkRewrite = () => {
  return (tree) => {
    return Promise.resolve(tree)
      .then((tree) =>
        flatMap(tree, (node) => {
          if (node.type === 'comment') {
            const parsed = raw({ type: 'raw', value: node.value });
            return parsed.children;
          }
          return [node];
        }),
      )
      .then((tree) => {
        remove(tree, (node) => {
          return node.type === 'element' && 'dataHidden' in node.properties;
        });
        return tree;
      })
      .then((tree) => {
        remove(tree, (node) => {
          return node.type === 'element' && node.tagName === 'p' && node.children.length === 0;
        });
        return tree;
      });
  };
};

export default remarkRewrite;
