import api from '../utils/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  _id: string;
  email: string;
  name: string;
  token: string;
  likedSongs: string[];
  likedPlaylists: string[];
  subscribedArtists: string[];
}

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await api.post<User>('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'Login failed');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the request. Please try again.');
    }
  }
}; 