import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useMemo } from 'react';

type DataPaginationProps = {
  page: number;
  totalPages: number;
  isFetching?: boolean;
  onPageChange: (page: number) => void;
};

export function DataPagination({ page, totalPages, isFetching, onPageChange }: DataPaginationProps) {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const paginationItems = useMemo(() => {
    const items: Array<{ type: 'page'; value: number } | { type: 'ellipsis'; key: string }> = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        items.push({ type: 'page', value: i });
      }
      return items;
    }

    items.push({ type: 'page', value: 1 });

    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);

    if (startPage > 2) {
      items.push({ type: 'ellipsis', key: 'start' });
    }

    for (let i = startPage; i <= endPage; i += 1) {
      items.push({ type: 'page', value: i });
    }

    if (endPage < totalPages - 1) {
      items.push({ type: 'ellipsis', key: 'end' });
    }

    items.push({ type: 'page', value: totalPages });

    return items;
  }, [page, totalPages]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }
    onPageChange(nextPage);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            className={!canGoPrev || isFetching ? 'pointer-events-none opacity-50' : undefined}
            onClick={event => {
              event.preventDefault();
              if (canGoPrev && !isFetching) {
                handlePageChange(page - 1);
              }
            }}
          />
        </PaginationItem>
        {paginationItems.map(item =>
          item.type === 'ellipsis' ? (
            <PaginationItem key={item.key}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item.value}>
              <PaginationLink
                href={`?page=${item.value}`}
                isActive={item.value === page}
                onClick={event => {
                  event.preventDefault();
                  handlePageChange(item.value);
                }}
              >
                {item.value}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href='#'
            className={!canGoNext || isFetching ? 'pointer-events-none opacity-50' : undefined}
            onClick={event => {
              event.preventDefault();
              if (canGoNext && !isFetching) {
                handlePageChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
