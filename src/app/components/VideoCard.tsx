import { useState } from 'react';
import { Play, Clock, Youtube } from 'lucide-react';
import { VideoCardData } from '@/types';

interface VideoCardProps {
  video: VideoCardData;
  hideChannelInfo?: boolean;
}

export function VideoCard({ video, hideChannelInfo = false }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks}週前`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months}個月前`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years}年前`;
  };

  const isShorts = video.type === 'shorts';
  const channelName = video.channelTitle || video.category || '未知頻道';

  // 如果縮圖載入失敗，不顯示整個卡片
  if (imageError) {
    return null;
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group cursor-pointer"
    >
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600">
        {/* 縮圖 - Shorts 使用 9:16 比例，影片使用 16:9 比例 */}
        <div className={`relative bg-gray-900 ${isShorts ? 'aspect-[9/16]' : 'aspect-video'}`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
            // onLoad={() => {
            //   console.log('Image loaded successfully:', video.thumbnail);
            // }}
            onError={(e) => {
              console.error('Image failed to load:', video.thumbnail);
              setImageError(true);
            }}
          />

          {/* 時長標籤 */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white text-xs px-2 py-1 rounded">
              {video.duration}
            </div>
          )}
        </div>

        {/* 影片資訊 */}
        <div className="p-3">
          {/* 剪輯頻道 */}
          {!hideChannelInfo && (
            <div className="flex items-center gap-1 mb-1.5">
              <Youtube className="w-3 h-3 text-red-500" />
              <span className="text-xs text-gray-400">{channelName}</span>
            </div>
          )}

          <h3 className="font-medium text-sm line-clamp-2 mb-2 text-gray-200 group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
