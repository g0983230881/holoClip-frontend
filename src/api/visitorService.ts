import axios from 'axios';
import { VisitorStats } from '@/types';

const visitorService = {
  incrementVisitorCount: async (): Promise<void> => {
    try {
      await axios.post(`/api/visitor/count`);
    } catch (error) {
      console.error('Error incrementing visitor count:', error);
    }
  },

  getVisitorCount: async (): Promise<VisitorStats | null> => {
    try {
      const response = await axios.get<VisitorStats>(`/api/visitor/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching visitor count:', error);
      return null;
    }
  }
};

export default visitorService;
