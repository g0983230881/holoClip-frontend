import { VideoCardData } from '@/types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: VideoCardData[];
  contentType: 'video' | 'shorts';
  hideChannelInfo?: boolean;
}

export function VideoGrid({ videos, contentType, hideChannelInfo = false }: VideoGridProps) {
  // Shorts 使用較寬的列，減少每行數量讓視覺效果更大
  const gridClass = contentType === 'shorts' 
    ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'
    : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4';

  return (
    <div className={gridClass}>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} hideChannelInfo={hideChannelInfo} />
      ))}
    </div>
  );
}
