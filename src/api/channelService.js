import axios from 'axios';
import { message } from 'antd'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const channelService = {
  getChannels: async (params) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/channels`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  },

  getChannelById: async (channelId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/channels/${channelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching channel ${channelId}:`, error);
      throw error;
    }
  },

  addChannel: async (channelData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/channels`, channelData);
      return response.data;
    } catch (error) {
      console.error('Error adding channel:', error);
      if (error.response && error.response.data) {
          throw new Error(error.response.data);
      }
      throw new Error('新增頻道時發生未知錯誤');
    }
  },

  updateChannel: async (channelId, updates) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/api/channels/${channelId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating channel ${channelId}:`, error);
      throw error;
    }
  },

  deleteChannels: async (channelIds) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/channels`, { data: { channelIds } });
    } catch (error) {
      console.error('Error deleting channels:', error);
      throw error;
    }
  },

  batchUpdateVerificationStatus: async (channelIds, isVerified) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/channels/batch-verify`, { channelIds, isVerified });
    } catch (error) {
      console.error('Error batch updating verification status:', error);
      throw error;
    }
  },

  getAllChannelsForFrontend: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/channels/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all channels for frontend:', error);
      throw error;
    }
  },
};

export default channelService;