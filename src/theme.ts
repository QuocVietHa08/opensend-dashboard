import { createTheme, MantineColorsTuple } from '@mantine/core';

const generalProps = {
  defaultProps: {
    radius: 'sm',
  },
}

const myColor: MantineColorsTuple = [
  '#effaf7',
  '#e0f2ec',
  '#bce6d7',
  '#95d9c1',
  '#75ceae',
  '#61c7a2',
  '#55c49b',
  '#46ac87',
  '#3a9977',
  '#298565'
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
}

export const theme = createTheme({
  colors: {
     myColor
  },
  components: componentTheme

});