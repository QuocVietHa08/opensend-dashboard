import { Paper, Text, ActionIcon, Flex, Group } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { selectViewType } from '../../store/slices/authSlice';
import { VIEW_TYPE } from '../../store/services/authApi';
import { theme } from '@/theme';

interface MetricWidgetProps {
  id: string;
  title: string;
  description: string;
  value: string | number;
  icon: React.ReactNode;
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function MetricWidget({
  id,
  title,
  description,
  onEdit,
  onDelete,
}: MetricWidgetProps) {
  const viewType = useSelector(selectViewType);
  const isAdmin = viewType === VIEW_TYPE.ADMIN;

  const handleEditClick = () => {
    if (!isAdmin) {
      return;
    }
    onEdit(id);
  };

  const handleDeleteClick = () => {
    if (!isAdmin || !onDelete) {
      return;
    }
    onDelete(id);
  };

  return (
    <Paper
      p="md"
      radius="md"
      shadow="sm"
      withBorder
      className="overflow-hidden"
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Flex justify="space-between" align="center" mb="xs" className="overflow-hidden">
        <div className="text-[18px] font-darker-grotesque font-bold whitespace-nowrap text-ellipsis">{title}</div>
        {isAdmin && (
          <Group gap={5} className="no-drag">
            <ActionIcon
              onClick={(e) => {
                // Prevent the click from triggering drag events
                e.stopPropagation();
                handleEditClick();
              }}
              variant="subtle"
              color={theme.colors?.myColor?.[9] || '#288364'}
              className="no-drag"
            >
              <IconEdit size={16} color={theme.primaryColor?.[9] || '#288364'} />
            </ActionIcon>
            {onDelete && (
              <ActionIcon
                onClick={(e) => {
                  // Prevent the click from triggering drag events
                  e.stopPropagation();
                  handleDeleteClick();
                }}
                variant="subtle"
                color="red"
                className="no-drag"
              >
                <IconTrash size={16} />
              </ActionIcon>
            )}
          </Group>
        )}
      </Flex>

      <Text size="sm" className="overflow-hidden text-ellipsis whitespace-nowrap">
        {description}
      </Text>
    </Paper>
  );
}
