/** @type {import('lint-staged').Config} */
const config = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,mdx,css,mjs}': ['prettier --write'],
}

export default config
