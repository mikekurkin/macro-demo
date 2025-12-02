import { WorkstationDialog, WorkstationFormValues } from '@/components/WorkstationDialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeleteWorkstation, useUpdateWorkstation, useWorkstation } from '@/hooks/use-workstations';
import { AlertCircle, ArrowLeft, Calendar, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function WorkstationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id || '0', 10);

  const { data, isLoading, error } = useWorkstation(postId);
  const workstation = data?.workstation;

  const deleteMutation = useDeleteWorkstation();
  const updateMutation = useUpdateWorkstation();

  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  async function handleUpdate(values: WorkstationFormValues) {
    await updateMutation.mutateAsync({
      id: postId,
      title: values.title,
      description: values.description,
      ipAddress: values.hasPc ? values.ipAddress : '',
    });
  }

  async function handleDelete() {
    await deleteMutation.mutateAsync({ id: postId });
    navigate('/workstations');
  }

  return (
    <div className='space-y-6'>
      <Button variant='ghost' asChild>
        <Link to='/workstations'>
          <ArrowLeft className='h-4 w-4 mr-2' />
          Назад к списку
        </Link>
      </Button>

      {isLoading && (
        <Card>
          <CardHeader>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </CardContent>
        </Card>
      )}

      {!isLoading && (error || !workstation) && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>Рабочее место не найдено</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && workstation && (
        <>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle className='text-2xl'>{workstation.title}</CardTitle>
                  <CardDescription>
                    <div className='flex items-center space-x-4 text-sm'>
                      <div className='flex items-center space-x-1'>
                        <Calendar className='h-3 w-3' />
                        <span>Создано: {new Date(workstation.createdAt).toLocaleString()}</span>
                      </div>
                      {workstation.updatedAt !== workstation.createdAt && (
                        <div className='flex items-center space-x-1'>
                          <Calendar className='h-3 w-3' />
                          <span>Обновлено: {new Date(workstation.updatedAt).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </CardDescription>
                </div>

                <div className='flex space-x-2'>
                  <Button variant='outline' size='icon' onClick={() => setEditOpen(true)}>
                    <Pencil className='h-4 w-4' />
                  </Button>
                  <Button variant='destructive' size='icon' onClick={() => setDeleteOpen(true)}>
                    <Trash className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className='space-y-4'>
              <div>
                <strong>Описание:</strong>
                <p className='whitespace-pre-wrap'>{workstation.description}</p>
              </div>

              <div>
                <Badge variant={workstation.hasPc ? 'default' : 'secondary'}>
                  {workstation.hasPc ? 'Рабочее место с ПК' : 'Рабочее место без ПК'}
                </Badge>
              </div>

              {workstation.hasPc && (
                <div>
                  <strong>IP-адрес:</strong> {workstation.ipAddress}
                </div>
              )}
            </CardContent>
          </Card>

          <WorkstationDialog
            initialValues={{
              title: workstation.title,
              description: workstation.description ?? '',
              hasPc: workstation.hasPc,
              ipAddress: workstation.ipAddress ?? '',
            }}
            onSubmit={handleUpdate}
            isPending={updateMutation.isPending}
            isOpen={isEditOpen}
            setOpen={setEditOpen}
            trigger={<></>}
          />

          <Dialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Удалить рабочее место?</DialogTitle>
              </DialogHeader>

              <p>Это действие нельзя отменить.</p>

              <DialogFooter>
                <Button variant='outline' onClick={() => setDeleteOpen(false)}>
                  Отмена
                </Button>
                <Button variant='destructive' onClick={handleDelete} disabled={deleteMutation.isPending}>
                  Удалить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
