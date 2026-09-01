import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import pluginPromise from 'eslint-plugin-promise';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

// `eslint-config-next@14` (matching our Next 14 runtime) only ships
// `.eslintrc`-style configs, not flat config — `FlatCompat` bridges them.
// This is also how Belong's real internal `@belong/config-eslint` package
// wires the same legacy `eslint-config-next` into flat config for apps still
// on Next 14, like belong-next. We take `core-web-vitals` only (React/hooks/
// a11y/import rules) and skip `next/typescript`, since it pulls in an older
// `@typescript-eslint` plugin instance that collides with `typescript-eslint`
// (8.x) below — that alone covers TypeScript linting.
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  {
    ignores: [
      '.next/',
      'node_modules/',
      'coverage/',
      'next.config.js',
      'postcss.config.js',
      'tailwind.config.js',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  ...tseslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  ...pluginTailwindcss.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
