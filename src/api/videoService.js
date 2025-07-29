import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const fetchVideosAndChannels = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/videos`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching videos and channels:", error);
        throw error;
    }
};