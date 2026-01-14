import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* 頁碼資訊 */}
      <div className="text-sm text-gray-300">
        第 {currentPage} 頁，共 {totalPages} 頁
      </div>

      {/* 分頁按鈕 */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {/* 第一頁 */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-9 h-9 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30"
        >
          <ChevronsLeft className="w-4 h-4" />
        </Button>

        {/* 上一頁 */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* 頁碼 */}
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => onPageChange(page as number)}
              className={currentPage === page 
                ? 'w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                : 'w-9 h-9 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            >
              {page}
            </Button>
          );
        })}

        {/* 下一頁 */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* 最後一頁 */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-30"
        >
          <ChevronsRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
