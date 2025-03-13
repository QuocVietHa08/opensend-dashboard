import { Box,  Flex} from '@mantine/core';
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

export function DashboardPage() {
  return (
    <Flex direction="column" py="xl" className="" w="100%" h="100%">
      <Box p="md">
        <div className="text-[30px] font-bold font-darker-grotesque">
          Dashboard
        </div>
        <div className="text-[20px] font-weight-500 font-darker-grotesque ">
          View and manage your metrics. Drag and resize widgets to customize your dashboard.
        </div>
      </Box>

      <DashboardGrid initialWidgets={initialWidgets} />
    </Flex>
  );
}
