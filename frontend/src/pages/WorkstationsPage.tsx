import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DataPagination } from '@/components/ui/data-pagination';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateWorkstation, useWorkstations } from '@/hooks/use-workstations';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, MonitorOff, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const formSchema = z
  .object({
    title: z.string().nonempty('Наименование не может быть пустым'),
    description: z.string(),
  })
  .and(
    z.union([
      z.object({ hasPc: z.literal(false), ipAddress: z.literal('') }),
      z.object({
        hasPc: z.literal(true),
        ipAddress: z
          .string()
          .nonempty('Рабочее место с ПК должно иметь IP-адрес')
          .regex(/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/, 'Некорректный IP-адрес'),
      }),
    ])
  );

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
    if (isNaN(page) || page < 1) setPage(1);
  }, [page, setPage]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      hasPc: false,
      ipAddress: '',
    },
    reValidateMode: 'onBlur',
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { mutateAsync: createWorkstation, isPending } = useCreateWorkstation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { title, description, ipAddress } = values;
      await createWorkstation({
        title,
        description,
        ipAddress: hasPc ? ipAddress : undefined,
      });
      form.reset();
      setServerError(null);
      setDialogOpen(false);
      setPage(1);
    } catch (err: any) {
      setServerError(err.message ?? 'Неизвестная ошибка при создании рабочего места');
    }
  }

  const hasPc = form.watch('hasPc');
  useEffect(() => {
    if (!hasPc) {
      form.setValue('ipAddress', '');
      form.clearErrors('ipAddress');
    }
  }, [hasPc, form]);

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
      <div className='flex justify-between align-baseline'>
        <h1 className='text-xl font-bold'>Список рабочих мест</h1>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className='top-16 translate-y-0 sm:max-w-[425px]'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Новое рабочее место</DialogTitle>
              </DialogHeader>
              <FieldGroup className='py-5'>
                <Controller
                  name='title'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Наименование</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder='WS-00-000'
                        aria-invalid={fieldState.invalid}
                        autoComplete='off'
                      />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='description'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Описание</FieldLabel>
                      <Input {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete='off' />

                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='hasPc'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className='flex items-center justify-between'>
                        <FieldLabel htmlFor={field.name}>Место с компьютером</FieldLabel>
                        <Switch
                          id={field.name}
                          checked={field.value}
                          aria-invalid={fieldState.invalid}
                          onCheckedChange={field.onChange}
                          ref={field.ref}
                        />
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                {hasPc && (
                  <Controller
                    name='ipAddress'
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>IP-адрес</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder='10.0.0.1'
                          autoComplete='off'
                        />

                        {fieldState.invalid ? (
                          <FieldError errors={[fieldState.error]} />
                        ) : (
                          <FieldDescription>Рабочее место с ПК должно иметь IP-адрес</FieldDescription>
                        )}
                      </Field>
                    )}
                  />
                )}
                {serverError !== null && <FieldError>{serverError}</FieldError>}
              </FieldGroup>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Отмена</Button>
                </DialogClose>
                <Button type='submit' disabled={isPending}>
                  Создать
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
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
