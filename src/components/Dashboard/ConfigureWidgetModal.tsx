import { Button, Card, Flex, Modal, Text, Textarea, TextInput } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

interface ConfigureWidgetModalProps {
  opened: boolean;
  onClose: () => void;
  onBack: () => void;
  onSave: () => void;
  selectedWidgetType: 'identities' | 'iterable' | 'yotpo' | null;
  newWidgetTitle: string;
  newWidgetDescription: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function ConfigureWidgetModal({
  opened,
  onClose,
  onBack,
  onSave,
  selectedWidgetType,
  newWidgetTitle,
  newWidgetDescription,
  onTitleChange,
  onDescriptionChange,
}: ConfigureWidgetModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} centered
    size="xxl"
    styles={{
      header: {
        backgroundColor: '#fafaf6'
      },
      body: {
        width: '900px',
        backgroundColor: '#fafaf6'
      }
    }}
    >
      <Flex direction="column" align="center" justify="center">
        <Text fw="bold" className="">Configure widget</Text>
        <Text mb="md">Add a title and select data to display on the overview page.</Text>
      </Flex>

      <Flex mb="md" gap="md">
        <Flex direction="column" h="auto" w="60%">
          <Flex direction="column" gap="5" bg="white"  className="rounded-t-md border" p="sm">

          <Flex align="center" justify="flex-start" bg="white">
            <Text>{newWidgetTitle}</Text>
          </Flex>
          <Flex gap="xs" align="center" justify="flex-start">
            <IconMail size={18} />
            <div className="text-[16px]">
              0
            </div>
          </Flex>
          </Flex>
          <Text p="sm" className="border border-t-0 rounded-b-md" size="sm" c="dimmed">
            {newWidgetDescription}
          </Text>
        </Flex>

        <Flex direction="column" gap="md" w="40%">
          <Card withBorder w="100%" radius="md" p="md">
            <div className="text-[16px]">Widget type</div>
            <Text className="text-[16px]">
              {selectedWidgetType === 'identities'
                ? 'Identities Provided - TEXT'
                : selectedWidgetType === 'iterable'
                  ? 'Iterable Metric - TEXT'
                  : 'Yotpo Metric - TEXT'}
            </Text>
          </Card>
          <Card withBorder p="md" radius="md">
            <TextInput
              label="Title"
              required
              withAsterisk
              value={newWidgetTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              mb="md"
            />

            <Textarea
              label="Description"
              required
              withAsterisk
              resize="none"
              value={newWidgetDescription}
              onChange={(e) => onDescriptionChange(e.target.value)}
              minRows={5}
              styles={{
              input: {
                height: '150px'
              }
              }}
            />
          </Card>
        </Flex>
      </Flex>

      <Flex flex={1} justify="center" gap="md">
        <Button className="flex-grow" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button className="flex-grow" onClick={onSave}>
          Add
        </Button>
      </Flex>
    </Modal>
  );
}
