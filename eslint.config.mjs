import { configs as sharedConfigs } from '@3846masa/configs/eslint';

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  {
    ignores: ['dist/', 'demo/'],
  },
  ...sharedConfigs,
];

export default configs;
