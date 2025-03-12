import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { IconPlus } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Box, Button, Group, Modal, Text, Textarea, TextInput } from '@mantine/core';
import { VIEW_TYPE } from '../../store/services/authApi';
import { selectViewType } from '../../store/slices/authSlice';
import { MetricWidget } from './MetricWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface Widget {
  id: string;
  title: string;
  description: string;
  type: 'identities' | 'iterable' | 'yotpo';
  value: string | number;
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

interface DashboardGridProps {
  initialWidgets?: Widget[];
}

export function DashboardGrid({ initialWidgets = [] }: DashboardGridProps) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [layouts, setLayouts] = useState<{ [key: string]: LayoutItem[] }>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedWidgetType, setSelectedWidgetType] = useState<string | null>(null);
  const [newWidgetTitle, setNewWidgetTitle] = useState('');
  const [newWidgetDescription, setNewWidgetDescription] = useState('');
  const viewType = useSelector(selectViewType);
  const isAdmin = viewType === VIEW_TYPE.ADMIN;

  // Load saved layouts and widgets from localStorage on component mount
  useEffect(() => {
    const savedLayouts = localStorage.getItem('dashboardLayouts');
    const savedWidgets = localStorage.getItem('dashboardWidgets');

    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
    } else {
      // Initialize with default layouts if none exist
      const defaultLayouts = {
        lg: initialWidgets.map((widget, index) => ({
          i: widget.id,
          x: (index % 3) * 4,
          y: Math.floor(index / 3) * 4,
          w: 4,
          h: 4,
          minW: 2,
          minH: 2,
        })),
      };
      setLayouts(defaultLayouts);
    }

    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, [initialWidgets]);

  // Save layouts and widgets to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(layouts).length > 0) {
      localStorage.setItem('dashboardLayouts', JSON.stringify(layouts));
    }
    if (widgets.length > 0) {
      localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
    }
  }, [layouts, widgets]);

  const handleLayoutChange = (
    _currentLayout: LayoutItem[],
    allLayouts: { [key: string]: LayoutItem[] }
  ) => {
    setLayouts(allLayouts);
  };

  const handleWidgetEdit = (id: string, title: string, description: string) => {
    setWidgets(
      widgets.map((widget) => (widget.id === id ? { ...widget, title, description } : widget))
    );
  };

  const handleAddWidget = () => {
    setIsAddModalOpen(true);
  };

  const handleWidgetTypeSelect = (type: string) => {
    setSelectedWidgetType(type);
    setIsAddModalOpen(false);
    setIsConfigModalOpen(true);

    // Set default title and description based on widget type
    if (type === 'identities') {
      setNewWidgetTitle('Identities Provided');
      setNewWidgetDescription('New identities provided during the selected time period.');
    } else if (type === 'iterable') {
      setNewWidgetTitle('Opened message');
      setNewWidgetDescription(
        'Number of provided identities who opened emails during the selected time period.'
      );
    } else if (type === 'yotpo') {
      setNewWidgetTitle('Clicked');
      setNewWidgetDescription(
        'Number of provided identities who clicked on emails for the selected time period.'
      );
    }
  };

  const handleSaveNewWidget = () => {
    if (!selectedWidgetType || !newWidgetTitle) {
      return;
    }

    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      title: newWidgetTitle,
      description: newWidgetDescription,
      type: selectedWidgetType as 'identities' | 'iterable' | 'yotpo',
      value: 0, // Default value
    };

    const newWidgets = [...widgets, newWidget];
    setWidgets(newWidgets);

    // Add layout for the new widget
    const newLayouts = { ...layouts };
    const lgLayout = newLayouts.lg || [];

    // Calculate position for the new widget
    const newLayoutItem: LayoutItem = {
      i: newWidget.id,
      x: (lgLayout.length % 3) * 4,
      y: Math.floor(lgLayout.length / 3) * 4,
      w: 4,
      h: 4,
      minW: 2,
      minH: 2,
    };

    newLayouts.lg = [...lgLayout, newLayoutItem];
    setLayouts(newLayouts);

    // Reset form
    setIsConfigModalOpen(false);
    setSelectedWidgetType(null);
    setNewWidgetTitle('');
    setNewWidgetDescription('');
  };

  // Render widget based on type
  const renderWidget = (widget: Widget) => {
    let icon;

    switch (widget.type) {
      case 'identities':
        icon = (
          <Box
            style={{
              background: '#e7f5e7',
              color: '#4caf50',
              borderRadius: '4px',
              padding: '8px',
              fontSize: '24px',
            }}
          >
            Aa
          </Box>
        );
        break;
      case 'iterable':
        icon = (
          <Box
            style={{
              background: '#e3f2fd',
              color: '#2196f3',
              borderRadius: '4px',
              padding: '8px',
              fontSize: '24px',
            }}
          >
            Aa
          </Box>
        );
        break;
      case 'yotpo':
        icon = (
          <Box
            style={{
              background: '#fff8e1',
              color: '#ffc107',
              borderRadius: '4px',
              padding: '8px',
              fontSize: '24px',
            }}
          >
            Aa
          </Box>
        );
        break;
      default:
        icon = null;
    }

    return (
      <MetricWidget
        id={widget.id}
        title={widget.title}
        description={widget.description}
        value={widget.value}
        icon={icon}
        onEdit={handleWidgetEdit}
      />
    );
  };

  return (
    <Box p="md">
      {isAdmin && (
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddWidget} mb="md">
          Add Metric
        </Button>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        isDraggable={isAdmin}
        isResizable={isAdmin}
        draggableHandle=".drag-handle"
      >
        {widgets.map((widget) => (
          <div key={widget.id} className="widget-container">
            <div
              className="drag-handle"
              style={{ cursor: isAdmin ? 'move' : 'default', height: '100%' }}
            >
              {renderWidget(widget)}
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Add Widget Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add a metric"
        centered
        size="lg"
      >
        <Text mb="md">Select a widget type to add to the overview page.</Text>

        <Box mb="xl">
          <Text fw={600} mb="md">
            Overview
          </Text>
          <Group justify="center" gap="lg">
            <Box
              p="lg"
              style={(theme: any) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: theme.colors.green[6],
                },
                width: 180,
                textAlign: 'center',
              })}
              onClick={() => handleWidgetTypeSelect('identities')}
            >
              <Box
                mb="sm"
                mx="auto"
                style={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 24,
                }}
              >
                Aa
              </Box>
              <Text>Identities Provided</Text>
            </Box>

            <Box
              p="lg"
              style={(theme: any) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: theme.colors.blue[6],
                },
                width: 180,
                textAlign: 'center',
              })}
              onClick={() => handleWidgetTypeSelect('iterable')}
            >
              <Box
                mb="sm"
                mx="auto"
                style={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 24,
                }}
              >
                Aa
              </Box>
              <Text>Iterable Metric</Text>
            </Box>

            <Box
              p="lg"
              style={(theme: any) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: theme.radius.md,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: theme.colors.yellow[6],
                },
                width: 180,
                textAlign: 'center',
              })}
              onClick={() => handleWidgetTypeSelect('yotpo')}
            >
              <Box
                mb="sm"
                mx="auto"
                style={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  fontSize: 24,
                }}
              >
                Aa
              </Box>
              <Text>Yotpo Metric</Text>
            </Box>
          </Group>
        </Box>

        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green">Next</Button>
        </Group>
      </Modal>

      {/* Configure Widget Modal */}
      <Modal
        opened={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        title="Configure widget"
        centered
        size="lg"
      >
        <Text mb="md">Add a title and select data to display on the overview page.</Text>

        <Group grow mb="md">
          <Box p="md" style={{ border: '1px solid #eee', borderRadius: 4 }}>
            <Box mb="sm" style={{ display: 'flex', alignItems: 'center' }}>
              <Box
                mr="xs"
                style={{
                  background:
                    selectedWidgetType === 'identities'
                      ? '#e7f5e7'
                      : selectedWidgetType === 'iterable'
                        ? '#e3f2fd'
                        : '#fff8e1',
                  color:
                    selectedWidgetType === 'identities'
                      ? '#4caf50'
                      : selectedWidgetType === 'iterable'
                        ? '#2196f3'
                        : '#ffc107',
                  borderRadius: 4,
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                }}
              >
                A
              </Box>
              <Text fw={600} tt="uppercase">
                {selectedWidgetType === 'identities'
                  ? 'IDENTITIES PROVIDED'
                  : selectedWidgetType === 'iterable'
                    ? 'OPENED MESSAGE'
                    : 'CLICKED'}
              </Text>
            </Box>
            <Text size="xl" fw={700} mb="xs">
              0
            </Text>
            <Text size="sm" c="dimmed">
              {newWidgetDescription}
            </Text>
          </Box>

          <Box>
            <Text mb="xs" fw={600}>
              Widget type
            </Text>
            <Text mb="lg">
              {selectedWidgetType === 'identities'
                ? 'Identities Provided - TEXT'
                : selectedWidgetType === 'iterable'
                  ? 'Iterable Metric - TEXT'
                  : 'Yotpo Metric - TEXT'}
            </Text>

            <TextInput
              label="Title"
              required
              value={newWidgetTitle}
              onChange={(e) => setNewWidgetTitle(e.target.value)}
              mb="md"
            />

            <Textarea
              label="Description"
              required
              value={newWidgetDescription}
              onChange={(e) => setNewWidgetDescription(e.target.value)}
              minRows={3}
            />
          </Box>
        </Group>

        <Group justify="flex-end">
          <Button variant="outline" onClick={() => setIsConfigModalOpen(false)}>
            Back
          </Button>
          <Button color="green" onClick={handleSaveNewWidget}>
            Add
          </Button>
        </Group>
      </Modal>
    </Box>
  );
}
