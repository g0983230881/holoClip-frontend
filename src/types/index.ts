// API 响应类型
export interface Video {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelId: string;
  channelTitle: string;
  channelThumbnailUrl?: string;
  publishedAt: string;
  viewCount?: number;
  duration?: string;
  isShorts?: boolean;
}

export interface Member {
  englishName: string;
  japaneseName: string;
  channelId?: string;
}

export interface Channel {
  channelId: string;
  channelName: string;
  thumbnailUrl?: string;
  subscriberCount?: number;
  videoCount?: number;
  isVerified?: boolean;
  createdAt?: string;
  publishedAt?: string;
  lastUpdated?: string;
}

export interface VisitorStats {
  today: number;
  total: number;
}

export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}

// 前端组件使用的类型
export interface VideoCardData {
  id: string;
  title: string;
  thumbnail: string;
  member?: string;
  category?: string;
  type: 'video' | 'shorts';
  views?: number;
  uploadDate: string;
  duration?: string;
  channelUrl?: string;
  channelTitle?: string;
}
