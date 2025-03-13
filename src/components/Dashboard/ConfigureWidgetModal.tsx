import { Button, Card, Flex, Modal, Textarea, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMail } from '@tabler/icons-react';
import { theme } from '@/theme';
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
  isEditMode?: boolean;
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
  isEditMode = false,
}: ConfigureWidgetModalProps) {
  const isMobile = useMediaQuery('(max-width: 576px)');
  const isTablet = useMediaQuery('(min-width: 577px) and (max-width: 992px)');

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
  return (
    <Modal opened={opened} onClose={onClose} centered
    size="xxl"
    styles={{
      header: {
        backgroundColor: '#fafaf6'
      },
      body: {
        width: getModalWidth(),
        backgroundColor: '#fafaf6'
      },
      inner: {
        padding: '16px'
      }
    }}
    >
      <Flex direction="column" align="center" gap="xs" justify="center" px={{ base: 'md', sm: 'xl' }} mb="md">
        <div className="font-darker-grotesque text-[18px] sm:text-[20px] font-bold text-center">{isEditMode ? 'Edit widget' : 'Configure widget'}</div>
        <div className="text-[11px] sm:text-[12px] text-[#848484] text-center">
          {isEditMode ? 'Edit title and description for this widget.' : 'Add a title and select data to display on the overview page.'}
        </div>
      </Flex>

      <Flex mb="md" gap={{ base: 'sm', sm: 'md' }} px={{ base: 'md', sm: 'xl' }} direction={{ base: 'column', md: 'row' }}>
        <Flex direction="column" h="auto" w={{ base: '100%', md: '60%' }} mb={{ base: 'md', md: 0 }}>
          <Flex direction="column" gap={10} bg="white"  className="rounded-t-sm border border-[#DEE2E6]" px={15} py={10}>

          <Flex align="center" justify="flex-start" bg="white">
            <div className="text-[12px] text-[#767676] font-bold">{newWidgetTitle.toUpperCase()}</div>
          </Flex>
          <Flex gap="xs" align="center" justify="flex-start">
            <IconMail size={18} />
            <div className="text-[16px]">
              0
            </div>
          </Flex>
          </Flex>
          <div className="px-[15px] py-[5px] text-[12px] text-[#9B9B9B] border border-t-0 border-[#DEE2E6] rounded-b-sm">
            {newWidgetDescription}
          </div>
        </Flex>

        <Flex direction="column" gap="md" w={{ base: '100%', md: '40%' }}>
          <Card withBorder w="100%" radius="sm" p="md">
            <div className="text-[13px] text-[#868686]">Widget type</div>
            <div className="text-[14px]">
              {selectedWidgetType === 'identities'
                ? 'Identities Provided - TEXT'
                : selectedWidgetType === 'iterable'
                  ? 'Iterable Metric - TEXT'
                  : 'Yotpo Metric - TEXT'}
            </div>
          </Card>
          <Card withBorder p="md" radius="sm" >
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
                height: '100px'
              }
              }}
            />
          </Card>
        </Flex>
      </Flex>

      <Flex flex={1} justify="center" gap={{ base: 'xs', sm: 'md' }} px={{ base: 'md', sm: 'xl' }} w="100%" direction={{ base: 'column', xs: 'row' }}>
        <Button className="flex-grow" bg="#fafaf6" variant="default"  onClick={onBack}>
          <div className="font-darker-grotesque font-semibold text-[18px]">{isEditMode ? 'Cancel' : 'Back'}</div>
        </Button>
        <Button  bg={theme?.colors?.myColor?.[10] || '#288364'} className="flex-grow" onClick={onSave}>
          <div className="font-darker-grotesque font-semibold text-[18px] text-white">{isEditMode ? 'Save' : 'Add'}</div>
        </Button>
      </Flex>
    </Modal>
  );
}
