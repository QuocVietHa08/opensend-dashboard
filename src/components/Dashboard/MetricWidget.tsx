import { useState } from 'react';
import { Paper, Text, Title, ActionIcon, Flex, Box } from '@mantine/core';
import { IconEdit, IconCheck } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { selectViewType } from '../../store/slices/authSlice';
import { VIEW_TYPE } from '../../store/services/authApi';

interface MetricWidgetProps {
  id: string;
  title: string;
  description: string;
  value: string | number;
  icon: React.ReactNode;
  onEdit: (id: string, title: string, description: string) => void;
}

export function MetricWidget({
  id,
  title,
  description,
  value,
  icon,
  onEdit,
}: MetricWidgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const viewType = useSelector(selectViewType);
  const isAdmin = viewType === VIEW_TYPE.ADMIN;

  const handleEditClick = () => {
    if (!isAdmin) {
      return;
    }
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(id, editTitle, editDescription);
    setIsEditing(false);
  };

  return (
    <Paper
      p="md"
      radius="md"
      shadow="sm"
      withBorder
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Flex justify="space-between" align="center" mb="xs">
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: '70%', padding: '4px' }}
          />
        ) : (
          <Title order={4}>{title}</Title>
        )}
        {isAdmin && (
          <ActionIcon
            onClick={isEditing ? handleSaveClick : handleEditClick}
            variant="subtle"
            color="blue"
          >
            {isEditing ? <IconCheck size={16} /> : <IconEdit size={16} />}
          </ActionIcon>
        )}
      </Flex>

      {isEditing ? (
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', minHeight: '60px' }}
        />
      ) : (
        <Text size="sm" color="dimmed" mb="md">
          {description}
        </Text>
      )}

      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ flex: 1 }}
      >
        <Box mb="xs">{icon}</Box>
        <Title order={2}>{value}</Title>
      </Flex>
    </Paper>
  );
}
