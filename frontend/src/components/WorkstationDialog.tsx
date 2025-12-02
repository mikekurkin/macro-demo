import { Button } from '@/components/ui/button';
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
import { Switch } from '@/components/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export const workstationSchema = z
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

export type WorkstationFormValues = z.infer<typeof workstationSchema>;

interface WorkstationFormProps {
  initialValues?: WorkstationFormValues;
  onSubmit: (values: WorkstationFormValues) => Promise<void>;
  isPending: boolean;
  setOpen: (value: boolean) => void;
  isOpen: boolean;
  trigger: JSX.Element;
}

export function WorkstationDialog({
  initialValues,
  onSubmit,
  isPending,
  isOpen,
  setOpen,
  trigger,
}: WorkstationFormProps) {
  const form = useForm<WorkstationFormValues>({
    resolver: zodResolver(workstationSchema),
    defaultValues: initialValues ?? {
      title: '',
      description: '',
      hasPc: false,
      ipAddress: '',
    },
    mode: 'onTouched',
  });

  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (initialValues) form.reset(initialValues);
  }, [initialValues]);

  const hasPc = form.watch('hasPc');

  useEffect(() => {
    if (!hasPc) {
      form.setValue('ipAddress', '');
      form.clearErrors('ipAddress');
    }
  }, [hasPc]);

  useEffect(() => {
    if (!isOpen) {
      setServerError(null);
      form.reset(initialValues);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    form.handleSubmit(async values => {
      try {
        await onSubmit(values);
        setOpen(false);
      } catch (err: any) {
        setServerError(err.message ?? 'Ошибка');
      }
    }),
    [form, onSubmit]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className='top-16 translate-y-0 sm:max-w-[425px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{initialValues ? 'Редактирование рабочего места' : 'Новое рабочее место'}</DialogTitle>
          </DialogHeader>

          <FieldGroup className='py-5'>
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Наименование</FieldLabel>
                  <Input {...field} autoComplete='off' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Описание</FieldLabel>
                  <Input {...field} autoComplete='off' />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='hasPc'
              control={form.control}
              render={({ field }) => (
                <Field>
                  <div className='flex items-center justify-between'>
                    <FieldLabel>Место с компьютером</FieldLabel>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </div>
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
                    <Input {...field} placeholder='10.0.0.1' autoComplete='off' />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : (
                      <FieldDescription>Рабочее место с ПК должно иметь IP-адрес</FieldDescription>
                    )}
                  </Field>
                )}
              />
            )}

            {serverError && <FieldError>{serverError}</FieldError>}
          </FieldGroup>

          <DialogFooter className='flex justify-between'>
            <DialogClose asChild>
              <Button variant='outline'>Отмена</Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {initialValues ? 'Сохранить' : 'Создать'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
