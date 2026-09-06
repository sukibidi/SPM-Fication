const { COLORS, TYPOGRAPHY, SPACING, ROUNDED } = require('./src/data/theme');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: COLORS,
      fontFamily: {
        'display-arcade': [TYPOGRAPHY['display-arcade'].fontFamily, 'sans-serif'],
        'headline': [TYPOGRAPHY['headline-lg'].fontFamily, 'sans-serif'],
        'body': [TYPOGRAPHY['body-md'].fontFamily, 'sans-serif'],
        'label-code': [TYPOGRAPHY['label-code'].fontFamily, 'monospace'],
        'label-numeric': [TYPOGRAPHY['label-numeric'].fontFamily, 'monospace'],
        'label-badge': [TYPOGRAPHY['label-badge'].fontFamily, 'monospace'],
      },
      fontSize: Object.fromEntries(
        Object.entries(TYPOGRAPHY).map(([k, v]) => [
          k,
          [`${v.fontSize}`, { lineHeight: v.lineHeight, fontWeight: v.fontWeight, letterSpacing: v.letterSpacing }],
        ])
      ),
      spacing: SPACING,
      borderRadius: ROUNDED,
    },
  },
  plugins: [],
};