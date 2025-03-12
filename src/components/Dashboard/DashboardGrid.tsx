import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { IconPlus } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mantine/core';
import { VIEW_TYPE } from '../../store/services/authApi';
import { selectViewType } from '../../store/slices/authSlice';
import { MetricWidget } from './MetricWidget';
import { AddMetricModal } from './AddMetricModal';
import { ConfigureWidgetModal } from './ConfigureWidgetModal';
import { WidgetIconBox } from './WidgetIconBox';

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
  const [selectedWidgetType, setSelectedWidgetType] = useState<'identities' | 'iterable' | 'yotpo' | null>(null);
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

  const handleWidgetTypeSelect = (type: 'identities' | 'iterable' | 'yotpo') => {
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
          <WidgetIconBox widgetType="identities" />
        );
        break;
      case 'iterable':
        icon = (
          <WidgetIconBox widgetType="iterable" />
        );
        break;
      case 'yotpo':
        icon = (
          <WidgetIconBox widgetType="yotpo" />
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
      <AddMetricModal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onWidgetTypeSelect={handleWidgetTypeSelect}
      />

      {/* Configure Widget Modal */}
      <ConfigureWidgetModal
        opened={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onBack={() => {
          setIsConfigModalOpen(false);
          setIsAddModalOpen(true);
        }}
        onSave={handleSaveNewWidget}
        selectedWidgetType={selectedWidgetType}
        newWidgetTitle={newWidgetTitle}
        newWidgetDescription={newWidgetDescription}
        onTitleChange={(value) => setNewWidgetTitle(value)}
        onDescriptionChange={(value) => setNewWidgetDescription(value)}
      />
    </Box>
  );
}
