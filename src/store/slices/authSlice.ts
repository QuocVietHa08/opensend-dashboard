import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the auth slice in the RootState
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  clientToken: string | null;
  isAuthenticated: boolean;
  viewType: string | null;
  storeId: string | null;
  onboardingStatus: string | null;
}

// Define a type-safe version of RootState for selectors
export interface RootState {
  auth: AuthState;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
  clientToken: localStorage.getItem('clientToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  viewType: localStorage.getItem('viewType'),
  storeId: localStorage.getItem('storeId'),
  onboardingStatus: localStorage.getItem('onboardingStatus'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        clientToken: string;
        view: { type: string };
        accesses?: Array<{ store_id: string; role: string }>;
      }>
    ) => {
      const { user, accessToken, clientToken, view, accesses } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.clientToken = clientToken;
      state.viewType = view.type;
      state.isAuthenticated = true;

      // Store the store ID if available (for CLIENT type)
      if (accesses && accesses.length > 0) {
        state.storeId = accesses[0].store_id;
      }

      // Save to localStorage for persistence
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('clientToken', clientToken);
      localStorage.setItem('viewType', view.type);

      if (accesses && accesses.length > 0) {
        localStorage.setItem('storeId', accesses[0].store_id);
      }
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setOnboardingStatus: (state, action: PayloadAction<string>) => {
      state.onboardingStatus = action.payload;
      localStorage.setItem('onboardingStatus', action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.clientToken = null;
      state.viewType = null;
      state.storeId = null;
      state.onboardingStatus = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('clientToken');
      localStorage.removeItem('viewType');
      localStorage.removeItem('storeId');
      localStorage.removeItem('onboardingStatus');
    },
  },
});

export const { setCredentials, setOnboardingStatus, logout, setIsAuthenticated } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectViewType = (state: RootState) => state.auth.viewType;
export const selectStoreId = (state: RootState) => state.auth.storeId;
export const selectOnboardingStatus = (state: RootState) => state.auth.onboardingStatus;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectClientToken = (state: RootState) => state.auth.clientToken;

export default authSlice.reducer;
