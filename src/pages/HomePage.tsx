import { useState, useEffect, useCallback, useMemo } from 'react';
import { StickyHeader } from '@/app/components/StickyHeader';
import { VideoGrid } from '@/app/components/VideoGrid';
import { PaginationControls } from '@/app/components/PaginationControls';
import { fetchVideosAndChannels } from '@/api/videoService';
import { fetchShortsAndChannels } from '@/api/shortService';
import channelService from '@/api/channelService';
import { getMembers } from '@/api/memberService';
import visitorService from '@/api/visitorService';
import { useDebounce } from '@/hooks/useDebounce';
import { transformVideoToCardData } from '@/utils/dataTransform';
import { Video, Member, Channel, VideoCardData, VisitorStats } from '@/types';

const ITEMS_PER_PAGE = 50;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [contentType, setContentType] = useState<'video' | 'shorts'>('video');
  const [currentPage, setCurrentPage] = useState(1);
  const [videos, setVideos] = useState<Video[]>([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({ today: 0, total: 0 });

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // 獲取成員和頻道列表
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [membersData, channelsData] = await Promise.all([
          getMembers(),
          channelService.getAllChannelsForFrontend(),
        ]);
        setMembers(membersData || []);
        setChannels(channelsData || []);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setMembers([]);
        setChannels([]);
      }
    };

    fetchInitialData();

    // 獲取訪問統計
    const fetchVisitorData = async () => {
      try {
        await visitorService.incrementVisitorCount();
        const stats = await visitorService.getVisitorCount();
        if (stats) {
          setVisitorStats(stats);
        }
      } catch (error) {
        console.error('Failed to fetch visitor data:', error);
      }
    };
    fetchVisitorData();
  }, []);

  // 獲取視頻數據
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: debouncedSearchQuery || undefined,
        channelId: selectedChannel !== 'all' ? selectedChannel : undefined,
        member: selectedMember !== 'all' ? selectedMember : undefined,
        page: currentPage - 1, // Spring Page is 0-indexed
        size: ITEMS_PER_PAGE,
      };

      const response = contentType === 'shorts'
        ? await fetchShortsAndChannels(params)
        : await fetchVideosAndChannels(params);

      setVideos(response.list || []);
      setTotalVideos(response.total || 0);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      setVideos([]);
      setTotalVideos(0);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery, selectedChannel, selectedMember, currentPage, contentType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 重置页码当筛选条件改变时
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMember, selectedChannel, contentType]);

  // 轉換視頻數據為組件所需格式
  const cardVideos: VideoCardData[] = useMemo(() => {
    return videos.map(video => transformVideoToCardData(video, contentType === 'shorts'));
  }, [videos, contentType]);

  // 計算總頁數
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  // 獲取選中的頻道對象
  const selectedChannelObj = useMemo(() => {
    return selectedChannel !== 'all' 
      ? channels.find(c => c.channelId === selectedChannel)
      : undefined;
  }, [selectedChannel, channels]);

  // 添加调试信息
  useEffect(() => {
    console.log('HomePage rendered', {
      loading,
      videosCount: videos.length,
      cardVideosCount: cardVideos.length,
      membersCount: members.length,
      channelsCount: channels.length,
    });
  }, [loading, videos.length, cardVideos.length, members.length, channels.length]);

  return (
    <div className="min-h-screen bg-gray-900">
      <StickyHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedMember={selectedMember}
        onMemberChange={setSelectedMember}
        selectedCategory={selectedChannel}
        onCategoryChange={setSelectedChannel}
        contentType={contentType}
        onContentTypeChange={setContentType}
        todayVisits={visitorStats.today}
        totalVisits={visitorStats.total}
        members={members}
        channels={channels}
        selectedChannel={selectedChannelObj}
      />

      <main className="container mx-auto px-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-xl text-gray-400">載入中...</div>
          </div>
        ) : (
          <>
            <VideoGrid 
              videos={cardVideos} 
              contentType={contentType}
              hideChannelInfo={selectedChannel !== 'all'}
            />
            
            {cardVideos.length > 0 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {cardVideos.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-400">沒有找到符合條件的影片</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
