import axios from 'axios';
import { Video, PageResponse } from '@/types';

interface VideoParams {
  search?: string;
  channelId?: string;
  member?: string;
  page?: number;
  size?: number;
}

export const fetchVideosAndChannels = async (params: VideoParams): Promise<PageResponse<Video>> => {
  try {
    const response = await axios.get<PageResponse<Video>>(`/api/videos`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching videos and channels:", error);
    throw error;
  }
};
