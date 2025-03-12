import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { theme } from './theme';
import { store } from './store';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <>
      <ColorSchemeScript />
      <Provider store={store}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <Notifications />
          <Router />
        </MantineProvider>
      </Provider>
    </>
  );
}
