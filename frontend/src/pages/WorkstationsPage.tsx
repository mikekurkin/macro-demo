import { Alert, AlertDescription } from '@/components/ui/alert';
import { DataPagination } from '@/components/ui/data-pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useWorkstations } from '@/hooks/use-workstations';
import { AlertCircle, MonitorOff } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function WorkstationsPage() {
  const [search, setSearch] = useSearchParams();
  const pageSize = 10;

  const page = Number(search.get('page'));
  const setPage = useCallback(
    (newPage: number) => {
      setSearch(new URLSearchParams({ ...Object.fromEntries(search.entries()), page: String(newPage) }));
    },
    [search]
  );
  useEffect(() => {
    if (isNaN(page)) setPage(1);
  }, [page, setPage]);

  const { data, isLoading, isFetching, error } = useWorkstations({ page, pageSize });
  const connection = data?.workstations;
  const workstations = connection?.results ?? [];
  const total = connection?.total ?? 0;
  const totalPages = total === 0 ? 1 : Math.max(1, Math.ceil(total / pageSize));

  if (error) {
    return (
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Рабочие места</h1>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Ошибка при загрузке рабочих мест: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[200px]'>Наименование</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead className='text-end'>IP-адрес</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className='h-4 w-2/3' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-1/2' />
                  </TableCell>
                  <TableCell>
                    <span className='flex justify-end'>
                      <Skeleton className='h-4 w-2/3' />
                    </span>
                  </TableCell>
                </TableRow>
              ))
            : workstations.map(workstation => (
                <TableRow key={workstation.id}>
                  <TableCell>
                    <Link to={`/workstation/${workstation.id}`} className='hover:underline decoration-dotted'>
                      {workstation.title}
                    </Link>
                  </TableCell>
                  <TableCell>{workstation.description}</TableCell>
                  <TableCell className='text-end'>
                    {workstation.hasPc ? (
                      workstation.ipAddress
                    ) : (
                      <span className='flex justify-end'>
                        <MonitorOff className='h-4 w-4 text-muted-foreground' />
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>

      <DataPagination page={page} totalPages={totalPages} isFetching={isFetching} onPageChange={setPage} />
    </div>
  );
}
