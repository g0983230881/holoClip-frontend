import { Search, ExternalLink, Eye } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Switch } from '@/app/components/ui/switch';
import { Label } from '@/app/components/ui/label';
import { Member, Channel } from '@/types';

interface StickyHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedMember: string;
  onMemberChange: (member: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  contentType: 'video' | 'shorts';
  onContentTypeChange: (type: 'video' | 'shorts') => void;
  todayVisits: number;
  totalVisits: number;
  members: Member[];
  channels: Channel[];
  selectedChannel?: Channel;
}

export function StickyHeader({
  searchQuery,
  onSearchChange,
  selectedMember,
  onMemberChange,
  selectedCategory,
  onCategoryChange,
  contentType,
  onContentTypeChange,
  todayVisits,
  totalVisits,
  members,
  channels,
  selectedChannel,
}: StickyHeaderProps) {
  const memberOptions = [
    { value: 'all', label: '全部成員' },
    ...members.map(m => ({ value: m.englishName, label: m.japaneseName })),
  ];

  const channelOptions = [
    { value: 'all', label: '全部頻道' },
    ...channels.map(c => ({ value: c.channelId, label: c.channelName })),
  ];

  const currentMember = members.find(m => m.englishName === selectedMember);

  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        {/* 標題 */}
        <div className="text-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            ✨ ホロライブ 中文精華基地 🎬
          </h1>
        </div>

        {/* 搜尋和篩選區 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* 搜尋框 */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder=" 搜尋影片標題..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          {/* 成員篩選 */}
          {/* <Select value={selectedMember || 'all'} onValueChange={onMemberChange}>
            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="👤 選擇成員" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {memberOptions.map((member) => (
                <SelectItem key={member.value} value={member.value} className="focus:bg-gray-700">
                  {member.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* 剪輯頻道篩選 */}
          <div className="lg:col-span-2">
            <Select value={selectedCategory || 'all'} onValueChange={onCategoryChange}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-full">
                <SelectValue placeholder="📺 選擇剪輯頻道" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {channelOptions.map((channel) => (
                  <SelectItem key={channel.value} value={channel.value} className="focus:bg-gray-700">
                    {channel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 連結和統計區 */}
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-4">
            {/* Excel 回饋連結 */}
            <a
              href="https://forms.gle/1F21GZa4tD3VFYuz6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              回報問題/新增頻道
            </a>

            {/* 篩選頻道連結 */}
            {selectedChannel && (
              <a
                href={`https://www.youtube.com/channel/${selectedChannel.channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                前往頻道
              </a>
            )}

            {/* 成員頻道連結 */}
            {currentMember && currentMember.channelId && (
              <a
                href={`https://www.youtube.com/channel/${currentMember.channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                {currentMember.japaneseName} 頻道
              </a>
            )}

            {/* 影片/Shorts 切換 */}
            <div className="flex items-center gap-2">
              <Label htmlFor="content-type" className="text-sm text-gray-300">
                🎬 影片
              </Label>
              <Switch
                id="content-type"
                checked={contentType === 'shorts'}
                onCheckedChange={(checked) => onContentTypeChange(checked ? 'shorts' : 'video')}
              />
              <Label htmlFor="content-type" className="text-sm text-gray-300">
                📱 Shorts
              </Label>
            </div>
          </div>

          {/* 訪問次數 */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span> 今日: {todayVisits.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span> 總計: {totalVisits.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
