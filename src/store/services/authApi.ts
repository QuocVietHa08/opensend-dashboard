import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../slices/authSlice';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  tokens: {
    accessToken: string;
    clientToken: string;
  };
  view: {
    type: string;
  };
  accesses?: Array<{
    store_id: string;
    role: string;
  }>;
}

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  // Add other profile fields as needed
}

interface StoreInfo {
  id: string;
  name: string;
  onboarding_procedure: {
    onboarding_status: string;
  };
  // Add other store fields as needed
}

// Constants for view types and onboarding status
export const VIEW_TYPE = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
};

export const ONBOARDING_STATUS = {
  DONE: 'DONE',
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://stgapp-bwgkn3md.opensend.com',
    prepareHeaders: (headers, { getState }) => {
      // Get the tokens from the auth state
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;
      const clientToken = state.auth.clientToken;
      // Add tokens to headers if they exist
      if (accessToken) {
        headers.set('Access-Token', `Bearer ${accessToken}`);
      }

      if (clientToken) {
        headers.set('Client-Token', clientToken);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: '/self/profile',
        method: 'GET',
      }),
    }),
    getStoreInfo: builder.query<StoreInfo, string>({
      query: (storeId) => ({
        url: `/store/${storeId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserProfileQuery,
  useGetStoreInfoQuery,
  useLazyGetStoreInfoQuery,
} = authApi;
