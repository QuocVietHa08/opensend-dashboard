import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './App.css';

import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Provider } from 'react-redux';
import { Router } from './Router';
import { theme } from './theme';
import { store } from './store';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from './contexts/ThemeContext';
import { Analytics } from "@vercel/analytics/react"

export default function App() {

  return (
    <>
      <ColorSchemeScript />
      <Provider store={store}>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <ThemeProvider>
            <Notifications />
            <Router />
          </ThemeProvider>
        </MantineProvider>
      </Provider>
      <Analytics />
    </>
  );
}
