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
        return { background: 'lightgray', color: 'gray' };
      case 'iterable':
        return { background: 'lightgray', color: 'gray' };
      case 'yotpo':
        return { background: 'lightgray', color: 'gray' };
      default:
        return { background: 'lightgray', color: 'gray' };
    }
  };

  // Get size dimensions
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { width: 28, height: 28, fontSize: 16 };
      case 'lg':
        return { width: 70, height: 70, fontSize: 28 };
      case 'md':
      default:
        return { width: 48, height: 48, fontSize: 20 };
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
