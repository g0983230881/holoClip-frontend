import axios from 'axios';

export const fetchVideosAndChannels = async (params) => {
    try {
        const response = await axios.get(`/api/videos`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching videos and channels:", error);
        throw error;
    }
};