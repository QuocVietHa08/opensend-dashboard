import React from 'react';

import { Box, Container, Text, Title } from '@mantine/core';
import { DashboardGrid, Widget } from '../components/Dashboard/DashboardGrid';

// Initial widgets for demonstration
const initialWidgets: Widget[] = [
  {
    id: 'widget-1',
    title: 'Identities Provided',
    description: 'New identities provided during the selected time period.',
    type: 'identities',
    value: 0,
  },
  {
    id: 'widget-2',
    title: 'Opened message',
    description: 'Number of provided identities who opened emails during the selected time period.',
    type: 'iterable',
    value: 0,
  },
  {
    id: 'widget-3',
    title: 'Clicked',
    description:
      'Number of provided identities who clicked on emails for the selected time period.',
    type: 'yotpo',
    value: 0,
  },
];

export function AdminPage() {
  // return (
  //   <div className="container">
  //     <h1>Admin Dashboard</h1>
  //     <p>This is the admin dashboard where administrators can manage the system.</p>
  //   </div>
  // );

  return (
    <Container size="xl" py="xl">
      <Box mb="xl">
        <Title order={2} mb="xs">
          Dashboard
        </Title>
        <Text color="dimmed">
          View and manage your metrics. Drag and resize widgets to customize your dashboard.
        </Text>
      </Box>

      <DashboardGrid initialWidgets={initialWidgets} />
    </Container>
  )
}
