import { createTheme, MantineColorsTuple } from '@mantine/core';

const generalProps = {
  defaultProps: {
    radius: 'sm',
  },
};

const myColor: MantineColorsTuple = [
  '#E6F3EE',
  '#C0E3D6',
  '#9AD3BE',
  '#74C3A6',
  '#4EB38E',
  '#288364',
  '#206A50',
  '#18503C',
  '#103628',
  '#081C14',
];

export const componentTheme = {
  Modal: {
    ...generalProps,
  },
  Icon: {
    ...generalProps,
  },
  Image: {
    ...generalProps,
  },
  Button: {
    ...generalProps,
    variant: 'light',
  },
  Input: {
    ...generalProps,
    color: '#298565',
  },
  TextInput: {
    ...generalProps,
  },
  Textarea: {
    ...generalProps,
  },
  NumberInput: {
    ...generalProps,
  },
  MultiSelect: {
    ...generalProps,
  },
  Select: {
    ...generalProps,
  },
  Divider: {
    defaultProps: {
      color: 'gray.3',
    },
  },
  Table: {
    defaultProps: {
      striped: true,
      highlightOnHover: true,
      withTableBorder: true,
    },
  },
  Badge: {
    defaultProps: {
      style: {
        letterSpacing: '0.5px',
      },
    },
  },
  Tooltip: {
    defaultProps: {
      color: 'white',
      c: 'black',
    },
  },
  Title: {
    styles: {
      root: {
        fontWeight: 600,
      },
    },
  },
};

export const theme = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
  components: componentTheme,
});
