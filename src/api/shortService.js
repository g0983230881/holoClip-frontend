import axios from 'axios';

export const fetchShortsAndChannels = async (params) => {
  try {
    const response = await axios.get(`/api/shorts`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching shorts and channels:', error);
    throw error;
  }
};