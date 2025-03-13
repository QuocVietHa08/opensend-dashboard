import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Flex,
  Image,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useLoginMutation } from '../store/services/authApi';
import {
  selectIsAuthenticated,
  setCredentials,
  setIsAuthenticated,
  setOnboardingStatus,
} from '../store/slices/authSlice';

const IconMail = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 w-4 h-4"
    >
      <path
        d="M2 8.8C2 7.11984 2 6.27976 2.32698 5.63803C2.6146 5.07354 3.07354 4.6146 3.63803 4.32698C4.27976 4 5.11984 4 6.8 4H17.2C18.8802 4 19.7202 4 20.362 4.32698C20.9265 4.6146 21.3854 5.07354 21.673 5.63803C22 6.27976 22 7.11984 22 8.8V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.7202 20 18.8802 20 17.2 20H6.8C5.11984 20 4.27976 20 3.63803 19.673C3.07354 19.3854 2.6146 18.9265 2.32698 18.362C2 17.7202 2 16.8802 2 15.2V8.8Z"
        fill="#BABDCC"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.17538 8.43441C6.4878 7.97898 7.11027 7.86305 7.56569 8.17548L11.4343 10.8293C11.7752 11.0632 12.2248 11.0632 12.5657 10.8294L16.4343 8.17548C16.8897 7.86305 17.5122 7.97898 17.8246 8.43441C18.137 8.88983 18.0211 9.51229 17.5657 9.82471L13.6971 12.4786C12.6744 13.1801 11.3256 13.1801 10.3029 12.4786L6.43431 9.82471C5.97889 9.51229 5.86296 8.88983 6.17538 8.43441Z"
        fill="black"
      />
    </svg>
  );
};

const IconLock = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M10.5594 6H5.4413C5.08988 5.99999 4.78668 5.99998 4.53698 6.02038C4.27341 6.04192 4.01127 6.08946 3.75901 6.21799C3.38269 6.40974 3.07673 6.7157 2.88498 7.09202C2.75645 7.34427 2.70891 7.60642 2.68737 7.86998C2.66697 8.11969 2.66698 8.42286 2.66699 8.77428V11.8924C2.66698 12.2438 2.66697 12.547 2.68737 12.7967C2.70891 13.0603 2.75645 13.3224 2.88498 13.5746C3.07673 13.951 3.38269 14.2569 3.75901 14.4487C4.01127 14.5772 4.27341 14.6248 4.53698 14.6463C4.78669 14.6667 5.08986 14.6667 5.44129 14.6667H10.5593C10.9108 14.6667 11.214 14.6667 11.4637 14.6463C11.7272 14.6248 11.9894 14.5772 12.2416 14.4487C12.618 14.2569 12.9239 13.951 13.1157 13.5746C13.2442 13.3224 13.2917 13.0603 13.3133 12.7967C13.3337 12.547 13.3337 12.2438 13.3337 11.8924V8.77432C13.3337 8.42292 13.3337 8.11968 13.3133 7.86998C13.2917 7.60642 13.2442 7.34427 13.1157 7.09202C12.9239 6.7157 12.618 6.40974 12.2416 6.21799C11.9894 6.08946 11.7272 6.04192 11.4637 6.02038C11.214 5.99998 10.9108 5.99999 10.5594 6Z"
        fill="#C8C9C8"
      />
      <path
        d="M7.33301 10.6667C7.33301 10.2985 7.63148 10 7.99967 10C8.36786 10 8.66634 10.2985 8.66634 10.6667V11.3333C8.66634 11.7015 8.36786 12 7.99967 12C7.63148 12 7.33301 11.7015 7.33301 11.3333V10.6667Z"
        fill="#1C1C1C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33301 4.00001C5.33301 2.52725 6.52692 1.33334 7.99967 1.33334C9.47243 1.33334 10.6663 2.52725 10.6663 4.00001V6.00001H9.33301V4.00001C9.33301 3.26363 8.73605 2.66668 7.99967 2.66668C7.26329 2.66668 6.66634 3.26363 6.66634 4.00001V6.00001H5.33301V4.00001Z"
        fill="#1C1C1C"
      />
    </svg>
  );
};

export function AuthPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [login, { error }] = useLoginMutation();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      email: 'test+admin@yopmail.com',
      password: '12345678',
    },
    validate: {
      email: isEmail('Please enter a valid email'),
      password: hasLength({ min: 1 }, 'Password is required'),
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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

  const handleFetchStoreInfo = async (
    storeId: string,
    accessToken: string,
    clientToken: string
  ) => {
    try {
      // Fetch store info and wait for the response
      const response = await fetch(`https://stgapp-bwgkn3md.opensend.com/store/${storeId}`, {
        headers: {
          'Access-Token': `Bearer ${accessToken}`,
          'Client-Token': clientToken,
        },
      });

      if (response.ok) {
        const storeInfo = await response.json();
        const onboardingStatus = storeInfo?.store?.onboarding_procedure?.onboarding_status;
        dispatch(setOnboardingStatus(onboardingStatus));
        dispatch(setIsAuthenticated(true))

        // Only redirect after we have the onboarding status
        const targetRoute = onboardingStatus !== 'DONE' ? '/onboard' : '/dashboard';
        navigate(targetRoute);
      }
      return false;
    } catch (storeError) {
      notifications.show({
        title: 'Store Info Error',
        message: 'Could not fetch store information, redirecting to dashboard',
        color: 'yellow',
      });
    }
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const result = await login(values).unwrap().then(async (res) => {
        if (res.view.type === 'CLIENT' && res.accesses && res.accesses.length > 0) {
        const storeId = res?.accesses[0].store_id;
        const accessToken = res.tokens.accessToken;
        const clientToken = res.tokens.clientToken;
        await handleFetchStoreInfo(storeId, accessToken, clientToken);
        }
        return res;
      })
      const updateCredentials = {
        user: result.user,
        accessToken: result.tokens.accessToken,
        clientToken: result.tokens.clientToken,
        isAuthenticated: false,
        view: result.view,
        accesses: result.accesses,
      };
      dispatch(setCredentials(updateCredentials));
    } catch (err) {
      notifications.show({
        title: 'Login Failed',
        message: 'Failed to connect to the server',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex flex={1} h="100vh" align="center" justify="center" bg={colorScheme === 'dark' ? '#1A1B1E' : '#EAEBEA'} pos="relative">
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Container w={420} my={40}>
        <Flex justify="center" mb="md">
          <Image
            src="https://s.opensend.com/opensend/assets/881b6e7edacf6fc7c9b829023ba7e4d1/logo_with_text.svg"
            w="200"
          />
        </Flex>
        <Paper radius="md" p="xl" withBorder shadow="md" bg={colorScheme === 'dark' ? '#25262B' : 'white'} style={{ borderColor: colorScheme === 'dark' ? '#373A40' : '#e0e0e0' }}>
          <div className={`text-center font-darker-grotesque font-semibold ${colorScheme === 'dark' ? 'text-[#C1C2C5]' : 'text-[rgb(43,43,43)]'} text-[28px] mb-3`}>
            Welcome back!
          </div>

          <div className={`text-center font-inter text-[14px] ${colorScheme === 'dark' ? 'text-[#909296]' : 'text-[rgb(43,43,43)]'} mb-5`}>
            Log in to continue with OpenSend
          </div>

          <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-[20px]">
            <TextInput
              placeholder="Email address"
              className="input-login"
              required
              disabled={isLoading}
              leftSection={<IconMail />}
              styles={{
                input: {
                  color: colorScheme === 'dark' ? '#C1C2C5' : undefined,
                  backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : undefined,
                  borderColor: colorScheme === 'dark' ? '#373A40' : undefined,
                }
              }}
              {...form.getInputProps('email')}
            />

            <PasswordInput
              placeholder="Password"
              className="input-login"
              required
              disabled={isLoading}
              leftSection={<IconLock />}
              styles={{
                input: {
                  backgroundColor: colorScheme === 'dark' ? '#1A1B1E' : undefined,
                  borderColor: colorScheme === 'dark' ? '#373A40' : undefined,
                  color: colorScheme === 'dark' ? '#C1C2C5' : undefined
                }
              }}
              {...form.getInputProps('password')}
            />
            <Flex direction="column" gap={3} mb="md">
              <Button
                fullWidth
                type="submit"
                loading={isLoading}
                disabled={!form.isValid()}
                color={theme?.colors?.myColor?.[10] || '#298566'}
              >
                <div className="font-semibold text-[16px] font-darker-grotesque">Login</div>
              </Button>
              <Button
                mt="xs"
                variant="default"
                fullWidth
                type="button"
                onClick={() => navigate('/auth')}
                styles={{
                  root: {
                    backgroundColor: colorScheme === 'dark' ? '#25262B' : undefined,
                    borderColor: colorScheme === 'dark' ? '#373A40' : undefined,
                  }
                }}
              >
                <div className="font-semibold text-[16px] font-darker-grotesque">
                  Forgot Your Password?
                </div>
              </Button>
            </Flex>
          </form>
        </Paper>
        <Flex
          mt="sm"
          gap="5"
          className={`items-center justify-center text-[10px] ${colorScheme === 'dark' ? 'text-[#909296]' : 'text-[rgb(130, 130, 130)]'} font-inter`}
        >
          <div>© 2025 Opensend Inc. All rights reserved</div>
          <div>|</div>
          <div>Terms Of Use</div>
          <div>|</div>
          <div>Privacy Policy</div>
        </Flex>
      </Container>
    </Flex>
  );
}
