import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'curly': 'off',
      '@typescript-eslint/brace-style': 'off',
      'no-mixed-operators': 'off',
      'style/brace-style': 'off',
    },
  },
  nuxt(),
)
