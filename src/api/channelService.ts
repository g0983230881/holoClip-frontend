import axios from 'axios';
import { Channel, PageResponse } from '@/types';

interface ChannelParams {
  page?: number;
  size?: number;
  [key: string]: unknown;
}

interface ChannelData {
  channelId?: string;
  channelName?: string;
  thumbnailUrl?: string;
  [key: string]: unknown;
}

interface UpdateChannelData {
  channelName?: string;
  thumbnailUrl?: string;
  [key: string]: unknown;
}

const channelService = {
  getChannels: async (params?: ChannelParams): Promise<PageResponse<Channel>> => {
    try {
      const response = await axios.get<PageResponse<Channel>>(`/api/channels`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching channels:', error);
      throw error;
    }
  },

  getChannelById: async (channelId: string): Promise<Channel> => {
    try {
      const response = await axios.get<Channel>(`/api/channels/${channelId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching channel ${channelId}:`, error);
      throw error;
    }
  },

  addChannel: async (channelData: ChannelData): Promise<Channel> => {
    try {
      const response = await axios.post<Channel>(`/api/channels`, channelData);
      return response.data;
    } catch (error: unknown) {
      console.error('Error adding channel:', error);
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new Error(String(error.response.data));
      }
      throw new Error('新增頻道時發生未知錯誤');
    }
  },

  updateChannel: async (channelId: string, updates: UpdateChannelData): Promise<Channel> => {
    try {
      const response = await axios.patch<Channel>(`/api/channels/${channelId}`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating channel ${channelId}:`, error);
      throw error;
    }
  },

  deleteChannels: async (channelIds: string[]): Promise<void> => {
    try {
      await axios.delete(`/api/channels`, { data: { channelIds } });
    } catch (error) {
      console.error('Error deleting channels:', error);
      throw error;
    }
  },

  batchUpdateVerificationStatus: async (channelIds: string[], isVerified: boolean): Promise<void> => {
    try {
      await axios.patch(`/api/channels/batch-verify`, { channelIds, isVerified });
    } catch (error) {
      console.error('Error batch updating verification status:', error);
      throw error;
    }
  },

  getAllChannelsForFrontend: async (): Promise<Channel[]> => {
    try {
      const response = await axios.get<Channel[]>(`/api/channels/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all channels for frontend:', error);
      throw error;
    }
  },
};

export default channelService;
