import React, { useCallback, useEffect, useState, useRef } from 'react';
import { List, Input, Select, Row, Col, Typography, Spin, Pagination, Flex, Avatar, Button, Switch } from 'antd';
import { BugOutlined } from '@ant-design/icons';
import { fetchVideosAndChannels } from '../api/videoService';
import { fetchShortsAndChannels } from '../api/shortService';
import channelService from '../api/channelService';
import visitorService from '../api/visitorService';
import VideoCard from '../components/VideoCard';
import { useDebounce } from '../hooks/useDebounce';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
    const dropdownRef = useRef(null);
    const [showShorts, setShowShorts] = useState(false);
    const [videos, setVideos] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 50,
        total: 0,
    });
    const [visitorStats, setVisitorStats] = useState({ today: 0, total: 0 });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(
        window.innerWidth >= 768 && window.innerWidth < 992
    );

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                search: debouncedSearchTerm,
                channelId: selectedChannel ? selectedChannel.channelId : null,
                page: pagination.current - 1, // Spring Page is 0-indexed
                size: pagination.pageSize,
            };
            const response = showShorts
                ? await fetchShortsAndChannels(params)
                : await fetchVideosAndChannels(params);
            // The backend now returns a PageResponse object.
            setVideos(response.list || []);
            setPagination(prev => ({
                ...prev,
                total: response.total,
            }));
        } catch (error) {
            console.error("Failed to fetch videos:", error);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm, selectedChannel, pagination.current, pagination.pageSize, showShorts]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const getChannels = async () => {
            try {
                // Pass empty params to get all channels; backend uses PageHelper.
                const channelsData = await channelService.getAllChannelsForFrontend();
                // PageHelper's page object uses 'list', not 'content'. Fallback to empty array.
                setChannels(channelsData || []);
            } catch (error) {
                console.error("Failed to fetch channels:", error);
                setChannels([]); // Set to empty array on error to prevent crash
            }
        };
        getChannels();

        const fetchVisitorData = async () => {
            try {
                await visitorService.incrementVisitorCount(); // Increment on page load
                const stats = await visitorService.getVisitorCount(); // Then get the updated count
                if (stats) {
                    setVisitorStats(stats);
                }
            } catch (error) {
                console.error("Failed to fetch visitor data:", error);
            }
        };
        fetchVisitorData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(
                window.innerWidth >= 768 && window.innerWidth < 992
            );
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePageChange = (page, pageSize) => {
        setPagination(prev => ({ ...prev, current: page, pageSize }));
    };

    const handleReset = () => {
        setSelectedChannel(null);
        setSearchTerm('');
    };

    const truncateChannelName = (name, maxLength = 15) => {
        if (name.length > maxLength) {
            return `${name.substring(0, maxLength)}...`;
        }
        return name;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title
                level={isMobile ? 4 : 2}
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={handleReset}
            >
                ホロライブ 中文精華基地
            </Title>
            <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'rgba(255, 255, 255, 0.87)', padding: '16px 0', width: '100%' }}>
                {isMobile && (
                    <Flex justify="space-between" align="center" style={{ marginBottom: 4, padding: '0 8px' }}>
                        <Button
                            type="link"
                            icon={<BugOutlined />}
                            href="https://forms.gle/QLY76i8PXY8DJZzT8"
                            target="_blank"
                        >
                            回報問題/新增頻道
                        </Button>
                        <Typography.Text>Today: {visitorStats.today} / Total: {visitorStats.total}</Typography.Text>
                    </Flex>
                )}
                <Row gutter={isMobile || isTablet ? [8, 8] : [16, 16]} style={{ justifyContent: 'center', alignItems: 'center', ...(isMobile && { marginBottom: 8 }) }}>
                    <Col xs={24} md={7}>
                        <Flex vertical align="center" gap={8}>
                            {!isMobile && (
                                <>
                                    <Button
                                        type="link"
                                        icon={<BugOutlined />}
                                        href="https://forms.gle/QLY76i8PXY8DJZzT8"
                                        target="_blank"
                                    >
                                        回報問題/新增烤肉man頻道
                                    </Button>
                                    {selectedChannel ? (
                                        <a href={`https://www.youtube.com/channel/${selectedChannel.channelId}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit', minWidth: 0 }}>
                                            <Avatar src={selectedChannel.thumbnailUrl} style={{ marginRight: 8 }} />
                                            <Typography.Text>前往頻道點我</Typography.Text>
                                        </a>
                                    ) : (
                                        <Typography.Text type="secondary">篩選頻道後此處可前往該頻道</Typography.Text>
                                    )}
                                </>
                            )}
                        </Flex>
                    </Col>
                    <Col xs={24} md={8}>
                        <Flex vertical gap={8}>
                            <Search
                                placeholder="搜尋影片標題..."
                                value={searchTerm}
                                onSearch={value => setSearchTerm(value)}
                                onChange={e => setSearchTerm(e.target.value)}
                                style={{ width: '100%' }}
                                allowClear
                            />
                            <Select
                                placeholder="選擇頻道"
                                onChange={value => {
                                    const channel = channels.find(c => c.channelId === value);
                                    setSelectedChannel(channel);
                                }}
                                value={selectedChannel?.channelId}
                                style={{ width: '100%' }}
                                styles={{
                                    selector: {
                                        // This ensures the text inside the selector will not overflow.
                                        overflow: 'hidden',
                                    }
                                }}
                                allowClear
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                onOpenChange={open => {
                                    if (open) {
                                        document.body.style.overflow = 'hidden';
                                    } else {
                                        document.body.style.overflow = '';
                                    }
                                }}
                            >
                                {channels.map(channel => (
                                    <Option key={channel.channelId} value={channel.channelId} title={channel.channelName}>
                                        {truncateChannelName(channel.channelName)}
                                    </Option>
                                ))}
                            </Select>
                        </Flex>
                    </Col>
                    <Col xs={0} md={7}>
                        <Flex vertical align="center" gap={8}>
                            <Typography.Text>Today: {visitorStats.today} / Total: {visitorStats.total}</Typography.Text>
                            {!isMobile && (
                                <Flex align="center" gap={16}>
                                    <Typography.Text style={{ fontSize: '16px' }}>影片</Typography.Text>
                                    <Switch
                                        checked={showShorts}
                                        onChange={setShowShorts}
                                        style={{ transform: 'scale(1.5)' }}
                                    />
                                    <Typography.Text style={{ fontSize: '16px' }}>Shorts</Typography.Text>
                                </Flex>
                            )}
                        </Flex>
                    </Col>
                </Row>
                {isMobile && (
                    <Row gutter={[16, 16]} style={{ marginBottom: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Col style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                            {selectedChannel ? (
                                <Flex align="center" justify="start" style={{ minWidth: 8 }}>
                                    <a href={`https://www.youtube.com/channel/${selectedChannel.channelId}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', color: 'inherit', minWidth: 0 }}>
                                        <Avatar src={selectedChannel.thumbnailUrl} style={{ marginRight: 8 }} />
                                        <Typography.Text>前往頻道點我</Typography.Text>
                                    </a>
                                </Flex>
                            ) : (
                                <Typography.Text type="secondary">篩選頻道後可前往該頻道</Typography.Text>
                            )}
                        </Col>
                        <Col>
                            <Flex align="center" gap={2}>
                                <Typography.Text style={{ fontSize: '16px' }}>影片</Typography.Text>
                                <Switch
                                    checked={showShorts}
                                    onChange={setShowShorts}
                                />
                                <Typography.Text style={{ fontSize: '16px' }}>Shorts</Typography.Text>
                            </Flex>
                        </Col>
                    </Row>
                )}
            </div>

            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <Flex vertical align="center" justify="center">
                        {showShorts ? (
                            <Flex wrap="wrap" gap={16} justify="center">
                                {videos.map(video => (
                                    <div key={video.videoId} style={{ width: '350px' }}>
                                        <VideoCard video={video} hideChannelInfo={!!selectedChannel} isShorts={showShorts} />
                                    </div>
                                ))}
                            </Flex>
                        ) : (
                            <Flex wrap="wrap" gap={16} justify="center">
                                {videos.map(video => (
                                    <div key={video.videoId} style={{ width: '350px' }}>
                                        <VideoCard video={video} hideChannelInfo={!!selectedChannel} isShorts={showShorts} />
                                    </div>
                                ))}
                            </Flex>
                        )}
                        <Pagination
                            style={{ marginTop: 20, textAlign: 'center' }}
                            current={pagination.current}
                            pageSize={pagination.pageSize}
                            total={pagination.total}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </Flex>
                )}
            </div>
        </div>
    );
};

export default HomePage;