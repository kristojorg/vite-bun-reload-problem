import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: false,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],

  jsxFramework: 'react',

  // Files to exclude
  exclude: [],

  // Theme customization
  theme: {
    extend: {},
  },

  patterns: {
    extend: {
      shadowPart: {
        description: 'Applies styles to a shadow part',
        properties: {
          // the part to target
          part: { type: 'string' },
        },
        transform(props) {
          const { part, ...rest } = props;
          return {
            [`&::part(${part})`]: {
              ...rest,
            },
          };
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
