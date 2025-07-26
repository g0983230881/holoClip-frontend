import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/videos` : '/api/videos'; // 使用代理

export const fetchVideosAndChannels = async (params) => {
    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching videos and channels:", error);
        throw error;
    }
};