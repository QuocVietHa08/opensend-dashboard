import { Button, Card, Flex, Modal, Textarea, TextInput, useMantineColorScheme } from '@mantine/core';
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
  return (
    <Modal opened={opened} onClose={onClose} centered
    size="xxl"
    styles={{
      header: {
        backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#fafaf6',
        borderBottom: colorScheme === 'dark' ? '1px solid #373A40' : '1px solid #e0e0e0'
      },
      body: {
        width: getModalWidth(),
        backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : '#fafaf6'
      },
      inner: {
        padding: '16px'
      }
    }}
    >
      <Flex direction="column" align="center" gap="xs" justify="center" px={{ base: 'md', sm: 'xl' }} mb="md">
        <div className="font-darker-grotesque text-[18px] sm:text-[20px] font-bold text-center">{isEditMode ? 'Edit widget' : 'Configure widget'}</div>
        <div className={`text-[11px] sm:text-[12px] ${colorScheme === 'dark' ? 'text-[#909296]' : 'text-[#848484]'} text-center`}>
          {isEditMode ? 'Edit title and description for this widget.' : 'Add a title and select data to display on the overview page.'}
        </div>
      </Flex>

      <Flex mb="md" gap={{ base: 'sm', sm: 'md' }} px={{ base: 'md', sm: 'xl' }} direction={{ base: 'column', md: 'row' }}>
        <Flex direction="column" h="auto" w={{ base: '100%', md: '60%' }} mb={{ base: 'md', md: 0 }}>
          <Flex direction="column" gap={10} bg={colorScheme === 'dark' ? '#25262B' : 'white'} className={`rounded-t-sm border ${colorScheme === 'dark' ? 'border-[#373A40]' : 'border-[#DEE2E6]'}`} px={15} py={10}>

          <Flex align="center" justify="flex-start" bg={colorScheme === 'dark' ? '#25262B' : 'white'}>
            <div className={`text-[12px] ${colorScheme === 'dark' ? 'text-[#909296]' : 'text-[#767676]'} font-bold`}>{newWidgetTitle.toUpperCase()}</div>
          </Flex>
          <Flex gap="xs" align="center" justify="flex-start">
            <IconMail size={18} color={colorScheme === 'dark' ? '#909296' : '#000'} />
            <div className={`text-[16px] ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : ''}`}>
              0
            </div>
          </Flex>
          </Flex>
          <div className={`px-[15px] py-[5px] text-[12px] ${colorScheme === 'dark' ? 'text-[#909296] bg-[#25262B]' : 'text-[#9B9B9B]'} border border-t-0 ${colorScheme === 'dark' ? 'border-[#373A40]' : 'border-[#DEE2E6]'} rounded-b-sm`}>
            {newWidgetDescription}
          </div>
        </Flex>

        <Flex direction="column" gap="md" w={{ base: '100%', md: '40%' }}>
          <Card withBorder w="100%" radius="sm" p="md" style={{
            backgroundColor: colorScheme === 'dark' ? '#25262B' : 'white',
            borderColor: colorScheme === 'dark' ? '#373A40' : '#DEE2E6'
          }}>
            <div className={`text-[13px] ${colorScheme === 'dark' ? 'text-[#909296]' : 'text-[#868686]'}`}>Widget type</div>
            <div className={`text-[14px] ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : ''}`}>
              {selectedWidgetType === 'identities'
                ? 'Identities Provided - TEXT'
                : selectedWidgetType === 'iterable'
                  ? 'Iterable Metric - TEXT'
                  : 'Yotpo Metric - TEXT'}
            </div>
          </Card>
          <Card withBorder p="md" radius="sm" style={{
            backgroundColor: colorScheme === 'dark' ? '#25262B' : 'white',
            borderColor: colorScheme === 'dark' ? '#373A40' : '#DEE2E6'
          }}>
            <TextInput
              label="Title"
              required
              className='input-login'
              withAsterisk
              value={newWidgetTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              mb="md"
            />

            <Textarea
              label="Description"
              required
              withAsterisk
              className='input-login'
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

      <Flex flex={1} justify="center" gap={{ base: 'xs', sm: 'md' }} px={{ base: 'md', sm: 'xl' }} w="100%" direction={{ base: 'column-reverse', xs: 'row' }}>
        <Button className="flex-grow" variant="default" onClick={onBack} styles={{
          root: {
            backgroundColor: colorScheme === 'dark' ? '#25262B' : undefined,
            borderColor: colorScheme === 'dark' ? '#373A40' : undefined,
          }
        }}>
          <div className="font-darker-grotesque font-semibold text-[18px]">{isEditMode ? 'Cancel' : 'Back'}</div>
        </Button>
        <Button bg={theme?.colors?.myColor?.[10] || '#288364'} className="flex-grow" onClick={onSave}>
          <div className="font-darker-grotesque font-semibold text-[18px] text-white">{isEditMode ? 'Save' : 'Add'}</div>
        </Button>
      </Flex>
    </Modal>
  );
}
