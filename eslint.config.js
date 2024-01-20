import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    rules: {
      'curly': 'off',
      '@typescript-eslint/brace-style': 'off',
      'no-mixed-operators': 'off',
      'style/brace-style': 'off',
    },
  },
  unocss.configs.flat,
)
