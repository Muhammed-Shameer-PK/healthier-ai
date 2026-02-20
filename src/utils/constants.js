import Constants from 'expo-constants';

export const ROLES = {
  WOMAN: 'woman',
  ASHA: 'asha',
};

export const BACKEND_URL =
  Constants.expoConfig?.extra?.backendUrl || 'http://localhost:3000/api';
