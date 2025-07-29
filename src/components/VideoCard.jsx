import React from 'react';
import { Card, Avatar, Typography, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-tw';

dayjs.extend(relativeTime);
dayjs.locale('zh-tw');

const { Title, Text } = Typography;

const VideoCard = ({ video, hideChannelInfo, isShorts }) => { // 新增 isShorts prop
  const timeFromNow = dayjs(video.publishedAt).fromNow();

  // 根據 isShorts 決定圖片容器的樣式
  const imageContainerStyle = isShorts ? {
    width: '100%',
    paddingTop: '100%', // 4:5 比例
    position: 'relative',
    overflow: 'hidden',
  } : {
    width: '100%',
    paddingTop: '56.25%', // 16:9 比例
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover', // 確保圖片覆蓋整個容器
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', marginBottom: 24 }}
      cover={
        <div style={imageContainerStyle} onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}>
          <img
            alt={video.title}
            src={video.thumbnailUrl}
            style={imageStyle}
          />
        </div>
      }
      styles={{ body: { padding: '12px', display: 'flex', flexDirection: 'column', height: '100%' } }}
    >
      <Title level={5} ellipsis={{ rows: 2, tooltip: video.title }} style={{ margin: 0, marginBottom: '8px', minHeight: '44px' }}>
        {video.title}
      </Title>
      {!hideChannelInfo && (
        <Flex align="" justify="center" style={{ marginTop: 'auto' }}>
          <Avatar size={40} src={video.channelThumbnailUrl || <UserOutlined />} />
          <Flex vertical style={{ marginLeft: '8px', minWidth: 0 }}>
          <Text style={{ fontSize: '14px', fontWeight: 500 }} ellipsis={{ tooltip: video.channelTitle }}>{video.channelTitle}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>{timeFromNow}</Text>
          </Flex>
        </Flex>
      )}
      {hideChannelInfo && (
        <Flex justify="center" style={{ marginTop: 'auto' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>{timeFromNow}</Text>
        </Flex>
      )}
    </Card>
  );
};

export default React.memo(VideoCard);
