import axios from 'axios';
import { Video, PageResponse } from '@/types';

interface ShortParams {
  search?: string;
  channelId?: string;
  member?: string;
  page?: number;
  size?: number;
}

export const fetchShortsAndChannels = async (params: ShortParams): Promise<PageResponse<Video>> => {
  try {
    const response = await axios.get<PageResponse<Video>>(`/api/shorts`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching shorts and channels:', error);
    throw error;
  }
};
