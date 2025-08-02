import axios from 'axios';

const visitorService = {
    incrementVisitorCount: async () => {
        try {
            await axios.post(`/api/visitor/count`);
        } catch (error) {
            console.error('Error incrementing visitor count:', error);
        }
    },

    getVisitorCount: async () => {
        try {
            const response = await axios.get(`/api/visitor/count`);
            return response.data;
        } catch (error) {
            console.error('Error fetching visitor count:', error);
            return null;
        }
    }
};

export default visitorService;