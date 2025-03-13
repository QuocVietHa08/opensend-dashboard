import { useState } from 'react';
import { Box, Button, Flex, Modal, Text, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { theme } from '@/theme';
import { WidgetIconBox } from './WidgetIconBox';

interface AddMetricModalProps {
  opened: boolean;
  onClose: () => void;
  onWidgetTypeSelect: (type: 'identities' | 'iterable' | 'yotpo') => void;
}

const OPTIONS: { value: 'identities' | 'iterable' | 'yotpo'; label: string }[] = [
  { value: 'identities', label: 'Identities Provided' },
  { value: 'iterable', label: 'Iterable Metric' },
  { value: 'yotpo', label: 'Yotpo Metric' },
];

export function AddMetricModal({ opened, onClose, onWidgetTypeSelect }: AddMetricModalProps) {
  const [selectedType, setSelectedType] = useState<'identities' | 'iterable' | 'yotpo' | null>(
    null
  );
  const isMobile = useMediaQuery('(max-width: 576px)');
  const isTablet = useMediaQuery('(min-width: 577px) and (max-width: 992px)');
  const { colorScheme } = useMantineColorScheme();

  // Get modal width based on screen size
  const getModalWidth = () => {
    if (isMobile) {
      return '100%';
    }
    if (isTablet) {
      return '720px';
    }
    return '900px';
  };

  const handleClose = () => {
    onClose();
    setSelectedType(null);
  }
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      size="xxl"
      styles={{
        header: {
          backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#fafaf6',
          minHeight: 'unset',
          padding: '1rem 1rem 0 1rem',
        },
        body: {
          width: getModalWidth(),
          backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#fafaf6',
        },
        inner: {
          padding: '16px',
        },
      }}
    >
      <Flex justify="center" align="center" direction="column" gap="xs" mb="md" px={{ base: 'md', sm: 'xl' }}>
        <div className="font-darker-grotesque text-[18px] sm:text-[20px] font-bold text-center">Add a metric</div>
        <div className="text-[11px] sm:text-[12px] text-[#848484] text-center">
          Select a widget type to add to the overview page.
        </div>
      </Flex>

      <Box mb="xl" px={{ base: 'md', sm: 'xl' }}>
        <Text fw={600} mb="md">
          Overview
        </Text>
        <Flex flex={1} justify="center" gap={{ base: 'md', sm: 'lg' }} align="center" direction={{ base: 'column', sm: 'row' }}>
          {OPTIONS.map((item: { value: 'identities' | 'iterable' | 'yotpo'; label: string }) => {
            return (
              <Flex
                flex={1}
                direction="column"
                p="lg"
                style={(theme: any) => ({
                  border:
                    selectedType === item.value
                      ? `2px solid ${theme?.colors?.green?.[10] || '#288364'}`
                      : `2px solid ${colorScheme === 'dark' ? theme?.colors?.dark?.[4] || '#373A40' : theme?.colors?.gray?.[3] || '#e0e0e0'}`,
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: theme?.colors?.green?.[6] || '#55c49b',
                  },
                  borderRadius: '5px',
                  width: '100%',
                  maxWidth: { base: '100%', sm: '200px' },
                  textAlign: 'center',
                  background: selectedType === item.value 
                    ? colorScheme === 'dark' ? '#1E2A24' : '#f9fcf9'
                    : colorScheme === 'dark' ? '#25262B' : 'white',
                })}
                onClick={() => setSelectedType(item.value)}
              >
                <WidgetIconBox widgetType={item.value} size="lg" />
                <div className="text-[14px]">{item.label}</div>
              </Flex>
            );
          })}
        </Flex>
      </Box>

      <Flex flex={1} justify="center" gap={{ base: 'xs', sm: 'md' }} px={{ base: 'md', sm: 'xl' }} w="100%" direction={{ base: 'column-reverse', xs: 'row' }}>
        <Button className="flex-grow" variant="default" onClick={handleClose}>
          <div className="font-darker-grotesque font-semibold text-[18px]">Cancel</div>
        </Button>
        <Button
          className="flex-grow"
          bg={theme?.colors?.myColor?.[10] || '#288364'}
          onClick={() => selectedType && onWidgetTypeSelect(selectedType)}
          disabled={!selectedType}
        >
          <div className="font-darker-grotesque font-semibold text-[18px] text-white">Next</div>
        </Button>
      </Flex>
    </Modal>
  );
}
