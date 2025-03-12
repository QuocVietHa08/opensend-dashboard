import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  rem,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useLoginMutation } from '../store/services/authApi';
import {
  selectIsAuthenticated,
  setCredentials,
  setOnboardingStatus,
} from '../store/slices/authSlice';

export function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [login, { isLoading, error }] = useLoginMutation();
  // const [errorMessage, setErrorMessage] = useState('');
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Please enter a valid email'),
      password: hasLength({ min: 1 }, 'Password is required'),
    },
  });

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Process API error messages
  useEffect(() => {
    if (error) {
      if ('data' in error) {
        const errorData = error.data as any;
        if (errorData?.message) {
          // Check if the error is related to the email field
          if (errorData.message.includes('email')) {
            form.setFieldError('email', errorData.message);
          } else {
            notifications.show({
              title: 'Login Failed',
              message: errorData.message,
              color: 'red',
            });
          }
        } else {
          notifications.show({
            title: 'Login Failed',
            message: 'An error occurred during login',
            color: 'red',
          });
        }
      } else {
        notifications.show({
          title: 'Login Failed',
          message: 'Failed to connect to the server',
          color: 'red',
        });
      }
    }
  }, [error, form]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      // setErrorMessage('');
      const result = await login(values).unwrap();
      dispatch(setCredentials(result));

      // Handle routing based on user role
      if (result.view.type === 'ADMIN') {
        // Admin users go to admin page
        navigate('/admin');
      } else if (result.view.type === 'CLIENT') {
        // For client users, we need to check the store's onboarding status
        if (result.accesses && result.accesses.length > 0) {
          const storeId = result.accesses[0].store_id;

          try {
            // Fetch store info to check onboarding status
            const response = await fetch(`https://stgapp-bwgkn3md.opensend.com/store/${storeId}`, {
              headers: {
                'Access-Token': `Bearer ${result.access_token}`,
                'Client-Token': result.client_token,
              },
            });

            if (response.ok) {
              const storeInfo = await response.json();
              const onboardingStatus = storeInfo.onboarding_procedure.onboarding_status;

              // Save onboarding status to state
              dispatch(setOnboardingStatus(onboardingStatus));

              // Redirect based on onboarding status
              if (onboardingStatus !== 'DONE') {
                navigate('/onboard');
              } else {
                navigate('/dashboard');
              }
            } else {
              // If we can't get store info, default to dashboard
              navigate('/dashboard');
            }
          } catch (storeError) {
            // Log error through notifications instead of console
            notifications.show({
              title: 'Store Info Error',
              message: 'Could not fetch store information, redirecting to dashboard',
              color: 'yellow',
            });
            navigate('/dashboard');
          }
        } else {
          // No store access, default to dashboard
          navigate('/dashboard');
        }
      } else {
        // Default fallback
        navigate('/dashboard');
      }
    } catch (err) {
      notifications.show({
        title: 'Login Failed',
        message: 'Failed to connect to the server',
        color: 'red',
      });
      // Error is handled in the useEffect above
    }
  };

  return (
    <Flex flex={1} h="100vh" align="center" justify="center">
      <Container w={520} my={40} className="flex items-center justify-center">
        <Paper radius="md" p="xl" withBorder shadow="md">
          <Title ta="center" order={2} mb={rem(30)}>
            Welcome back!
          </Title>

          <Text ta="center" size="sm" mb={rem(20)}>
            Log in to continue with OpenSend
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              // label="Email"
              placeholder="your@email.com"
              required
              mb="md"
              leftSection={<span>📧</span>}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              // label="Password"
              placeholder="Your password"
              required
              mb="md"
              leftSection={<span>🔒</span>}
              {...form.getInputProps('password')}
            />

            <Button
              fullWidth
              type="submit"
              loading={isLoading}
              disabled={!form.isValid()}
              color={colorScheme === 'dark' ? theme.colors.green[7] : theme.colors.green[6]}
            >
              Login
            </Button>
            <Button
              mt="xs"
              variant="default"
              fullWidth
              type="button"
              onClick={() => navigate('/auth')}
            >
              Forgot Your Password?
            </Button>
          </form>
        </Paper>
      </Container>
    </Flex>
  );
}
