import { Video, Member, Channel, VideoCardData } from '@/types';

/**
 * 将 API 返回的视频数据转换为组件所需格式
 */
export function transformVideoToCardData(video: Video, isShorts: boolean = false): VideoCardData {
  return {
    id: video.videoId,
    title: video.title,
    thumbnail: video.thumbnailUrl,
    type: isShorts ? 'shorts' : 'video',
    uploadDate: video.publishedAt,
    duration: video.duration,
    channelTitle: video.channelTitle,
    views: video.viewCount,
  };
}

/**
 * 将成员列表转换为选择器选项格式
 */
export function transformMembersToOptions(members: Member[]) {
  return [
    { value: 'all', label: '全部成員' },
    ...members.map(member => ({
      value: member.englishName,
      label: member.japaneseName,
    })),
  ];
}

/**
 * 将频道列表转换为选择器选项格式
 */
export function transformChannelsToOptions(channels: Channel[]) {
  return [
    { value: 'all', label: '全部頻道' },
    ...channels.map(channel => ({
      value: channel.channelId,
      label: channel.channelName,
    })),
  ];
}
