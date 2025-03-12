import { useState } from 'react';
import { Box, Button, Flex, Modal, Text } from '@mantine/core';
import { WidgetIconBox } from './WidgetIconBox';

interface AddMetricModalProps {
  opened: boolean;
  onClose: () => void;
  onWidgetTypeSelect: (type: 'identities' | 'iterable' | 'yotpo') => void;
}

export function AddMetricModal({ opened, onClose, onWidgetTypeSelect }: AddMetricModalProps) {
  const [selectedType, setSelectedType] = useState<'identities' | 'iterable' | 'yotpo' | null>(
    null
  );
  return (
    <Modal opened={opened} onClose={onClose} centered size="xxl"
    styles={{
      header: {
        backgroundColor: '#fafaf6'
      },
      body: {
        width: '900px',
        backgroundColor: '#fafaf6'
      }
    }}>
      <Flex justify="center" align="center" direction="column" gap="md">
        <Text fw="bold">Add a metric</Text>
        <Text mb="md">Select a widget type to add to the overview page.</Text>
      </Flex>

      <Box mb="xl">
        <Text fw={600} mb="md">
          Overview
        </Text>
        <Flex flex={1} justify="center" gap="lg">
          <Flex
            flex={1}
            direction="column"
            p="lg"
            style={(theme: any) => ({
              border:
                selectedType === 'identities'
                  ? `2px solid ${theme.colors.green[6]}`
                  : `1px solid ${theme.colors.gray[3]}`,
              borderRadius: theme.radius.md,
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.green[6],
              },
              width: 180,
              textAlign: 'center',
              background: selectedType === 'identities' ? '#f9fcf9' : 'white',
            })}
            onClick={() => setSelectedType('identities')}
          >
            <WidgetIconBox widgetType="identities" size="lg" />
            <Text>Identities Provided</Text>
          </Flex>

          <Flex
            flex={1}
            p="lg"
            direction="column"
            style={(theme: any) => ({
              border:
                selectedType === 'iterable'
                  ? `2px solid ${theme.colors.blue[6]}`
                  : `1px solid ${theme.colors.gray[3]}`,
              borderRadius: theme.radius.md,
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.blue[6],
              },
              width: 180,
              textAlign: 'center',
              background: selectedType === 'iterable' ? '#f5faff' : 'white',
            })}
            onClick={() => setSelectedType('iterable')}
          >
            <WidgetIconBox widgetType="iterable" size="lg" />
            <Text>Iterable Metric</Text>
          </Flex>

          <Flex
            flex={1}
            direction="column"
            p="lg"
            style={(theme: any) => ({
              border:
                selectedType === 'yotpo'
                  ? `2px solid ${theme.colors.yellow[6]}`
                  : `1px solid ${theme.colors.gray[3]}`,
              borderRadius: theme.radius.md,
              cursor: 'pointer',
              '&:hover': {
                borderColor: theme.colors.yellow[6],
              },
              width: 180,
              textAlign: 'center',
              background: selectedType === 'yotpo' ? '#fffdf5' : 'white',
            })}
            onClick={() => setSelectedType('yotpo')}
          >
            <WidgetIconBox widgetType="yotpo" size="lg" />
            <Text>Yotpo Metric</Text>
          </Flex>
        </Flex>
      </Box>

      <Flex align="center" justify="center" gap="md">
        <Button className="flex-grow" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
        className="flex-grow"
          onClick={() => selectedType && onWidgetTypeSelect(selectedType)}
          disabled={!selectedType}
        >
          Next
        </Button>
      </Flex>
    </Modal>
  );
}
