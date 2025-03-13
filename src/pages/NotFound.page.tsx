import { Button, Container, Group, Text, Title, useMantineTheme, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <Container py={80}>
      <Stack align="center" gap="xl">
        <Text
          style={{
            fontSize: '220px',
            fontWeight: 900,
            lineHeight: 1,
            color: theme.colors.gray[3],
            textAlign: 'center',
          }}
        >
          404
        </Text>
        <Title
          style={{
            textAlign: 'center',
            fontWeight: 900,
          }}
          order={2}
        >
          Page not found
        </Title>
        <Text color="dimmed" size="lg" ta="center" maw={500} mx="auto">
          The page you are looking for doesn't exist. You may have mistyped the address, or the
          page may have been moved to another URL.
        </Text>
        <Group justify="center">
          <Button variant="default" size="md" onClick={() => navigate('/dashboard')}>
            Take me back to dashboard
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
