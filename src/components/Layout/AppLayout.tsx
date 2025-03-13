import { useState, useEffect } from 'react';
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
  Drawer,
  Burger,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTheme } from '../../contexts/ThemeContext';
import { logout } from '../../store/slices/authSlice';

export function AppLayout() {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleColorScheme, colorScheme } = useTheme();
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        closeDrawer();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeDrawer]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  const UserProfileMenu = () => (
    <Menu
      width={260}
      position="top-end"
      transitionProps={{ transition: 'pop-top-right' }}
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
  );

  const DrawerContent = () => (
    <Flex direction="column" h="100%" justify="space-between">
      <Box>
        {/* Navigation items can be added here */}
      </Box>

      <Box>
        <UserProfileMenu />
      </Box>
    </Flex>
  );

  const NavbarContent = () => (
    <>
      <AppShell.Section grow>
        <Box mb="xl">
          <Flex align="center" justify="center" direction="column" gap="md">
            <Image
              src="https://s.opensend.com/opensend/assets/881b6e7edacf6fc7c9b829023ba7e4d1/logo_with_text.svg"
              w="150"
            />
          </Flex>
        </Box>

      </AppShell.Section>

      <AppShell.Section>
        <UserProfileMenu />
      </AppShell.Section>
    </>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="250px"
        padding="md"
        title={
          <Flex justify="space-between" align="center" w="100%">
            <Image
              src="https://s.opensend.com/opensend/assets/881b6e7edacf6fc7c9b829023ba7e4d1/logo_with_text.svg"
              w="120"
            />
          </Flex>
        }
        styles={{
          content: {
           height: '100%',
          },
          header: {
            padding: '12px 16px',
          },
          body: {
            height: 'calc(100% - 60px)'
          },
          title: {
            width: '100%',
            margin: 0,
          },
        }}
      >
        <DrawerContent />
      </Drawer>

      <AppShell
        navbar={{
          width: 250,
          breakpoint: 'md',
          collapsed: { mobile: true, desktop: false },
        }}
        padding="md"
        header={{
          height: isMobile ? 60 : 0,
          collapsed: !isMobile,
        }}
      >

      {/* Mobile Header */}
      <AppShell.Header display={isMobile ? 'flex' : 'none'} p="md">
        <Flex justify="space-between" align="center" w="100%" h="100%">
          <Image
            src="https://s.opensend.com/opensend/assets/881b6e7edacf6fc7c9b829023ba7e4d1/logo_with_text.svg"
            w="120"
          />
          <Burger opened={drawerOpened} onClick={openDrawer} size="sm" />
        </Flex>
      </AppShell.Header>

      {/* Desktop Navbar */}
      <AppShell.Navbar p="md">
        <NavbarContent />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
    </>
  
  );
}
