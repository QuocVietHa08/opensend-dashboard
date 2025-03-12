import { Box, BoxProps } from '@mantine/core';

type WidgetType = 'identities' | 'iterable' | 'yotpo' | 'default';

interface WidgetIconBoxProps extends BoxProps {
  widgetType?: WidgetType;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function WidgetIconBox({
  widgetType = 'default',
  size = 'md',
  children = 'Aa',
  ...props
}: WidgetIconBoxProps) {
  // Get background and text color based on widget type
  const getColors = () => {
    switch (widgetType) {
      case 'identities':
        return { background: '#e7f5e7', color: '#4caf50' };
      case 'iterable':
        return { background: '#e3f2fd', color: '#2196f3' };
      case 'yotpo':
        return { background: '#fff8e1', color: '#ffc107' };
      default:
        return { background: '#f5f5f5', color: '#757575' };
    }
  };

  // Get size dimensions
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { width: 24, height: 24, fontSize: 14 };
      case 'lg':
        return { width: 60, height: 60, fontSize: 24 };
      case 'md':
      default:
        return { width: 40, height: 40, fontSize: 18 };
    }
  };

  const { background, color } = getColors();
  const { width, height, fontSize } = getDimensions();

  return (
    <Box
      mb="sm"
      mx="auto"
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background,
        color,
        borderRadius: '4px',
        fontSize,
        ...(size === 'lg' ? { border: '1px solid #ddd' } : {}),
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
