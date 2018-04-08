// import theme from 'rebass/dist/theme.js'

const defaultTheme = {
  'breakpoints': [
    '32em',
    '48em',
    '64em',
    '80em'
  ],
  'space': [
    0,
    4,
    8,
    16,
    32,
    64,
    128
  ],
  'fontSizes': [
    12,
    14,
    16,
    20,
    24,
    32,
    48,
    64,
    72,
    96
  ],
  'fontWeights': {
    'normal': 400,
    'bold': 700
  },
  'fonts': {
    '0': 'system-ui, sans-serif',
    'sans': '"system-ui, sans-serif',
    'mono': '"SF Mono", "Roboto Mono", Menlo, monospace'
  },
  'colors': {
    'black': '#000',
    'white': '#fff',
    'darken': [
      'rgba(0, 0, 0, 0.125)',
      'rgba(0, 0, 0, 0.25)',
      'rgba(0, 0, 0, 0.5)',
      'rgba(0, 0, 0, 0.75)'
    ],
    'dark': 'rgba(0, 0, 0, 0.75)',
    'gray': '#eee',
    'blue': '#f7705b',
    'primary': '#f7705b',
    'indigo': '#1000ee',
    'violet': '#8700ee',
    'fuschia': '#ee00de',
    'pink': '#ee0067',
    'red': '#ee1000',
    'orange': '#ee8700',
    'yellow': '#deee00',
    'lime': '#67ee00',
    'green': '#00ee10',
    'teal': '#00ee87',
    'cyan': '#00deee'
  },
  'radii': [
    0,
    2,
    4
  ],
  'shadows': [
    'none',
    'inset 0 0 0 1px #eee',
    'inset 0 0 0 1px #eee, 0 0 4px #eee'
  ]
}

const customTheme = {
  fonts: {
    0: 'system-ui, sans-serif',
    sans: '"Avenir Next", Helvetica, sans-serif',
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace'
  }
}

const theme = {
  ...defaultTheme,
  ...customTheme
}

export default theme