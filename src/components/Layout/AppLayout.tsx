import { useState } from 'react';
import { IconLogout, IconMoon, IconSun, IconUser } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Avatar,
  Box,
  Flex,
  Group,
  Image,
  Menu,
  rem,
  Switch,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useTheme } from '../../contexts/ThemeContext';
import { logout } from '../../store/slices/authSlice';

export function AppLayout() {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, setUserMenuOpened] = useState(false);
  const { toggleColorScheme, colorScheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <AppShell
      // header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
      }}
      padding="md"
    >

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          {/* Logo at the top */}
          <Box mb="xl">
            <Flex align="center" justify="center" direction="column" gap="md">
              <Image
                src="https://s.opensend.com/opensend/assets/881b6e7edacf6fc7c9b829023ba7e4d1/logo_with_text.svg"
                w="150"
              />
            </Flex>
          </Box>

          {/* Navigation items can be added here */}
        </AppShell.Section>

        <AppShell.Section>
          {/* User info at the bottom */}
          <Menu
            width={260}
            position="top-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                style={{
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.dark[0],
                }}
              >
                <Group>
                  <Avatar src={null} radius="xl" color="brand">
                    <IconUser size={24} />
                  </Avatar>

                  <Box style={{ flex: 1 }}>
                    <Text size="sm" fw={500} className="font-darker-grotesque">
                      Admin User
                    </Text>
                    <Text c="dimmed" size="xs" className="font-darker-grotesque">
                      admin@opensend.com
                    </Text>
                  </Box>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  colorScheme === 'dark' ? (
                    <IconSun style={{ width: rem(16), height: rem(16) }} />
                  ) : (
                    <IconMoon style={{ width: rem(16), height: rem(16) }} />
                  )
                }
                onClick={toggleColorScheme}
                rightSection={
                  <Switch checked={colorScheme === 'dark'} onChange={toggleColorScheme} size="sm" />
                }
              >
                {colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
