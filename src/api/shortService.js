import axios from 'axios';

// const API_URL = 'http://localhost:8080https://holoclip-backend.onrender.com/api/shorts';
const API_URL = 'https://holoclip-backend.onrender.com/api/shorts';

export const fetchShortsAndChannels = async (params) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching shorts and channels:', error);
    throw error;
  }
};