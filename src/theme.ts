import { createTheme } from '@mantine/core';

export const theme = createTheme({
    colors: {
      brand: [
        '#f0f4f8', // Lightest
        '#d9e2ec',
        '#bcccdc',
        '#9fb3c8',
        '#829ab1',
        '#627d98', // Base color
        '#486581',
        '#334e68',
        '#243b53',
        '#102a43', // Darkest
      ],
    },
    primaryColor: 'brand',
    fontFamily: '"Darker Grotesque", sans-serif',
    headings: {
      fontFamily: '"Darker Grotesque", sans-serif',
      fontWeight: '600',
    },
});
