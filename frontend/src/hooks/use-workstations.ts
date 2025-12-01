import { execute } from '@/lib/graphql/execute';
import { CREATE_WORKSTATION, DELETE_WORKSTATION, UPDATE_WORKSTATION } from '@/lib/graphql/mutations';
import { GET_WORKSTATION, GET_WORKSTATIONS } from '@/lib/graphql/queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export const useWorkstations = ({ page = 1, pageSize = 10 }: PaginationOptions = {}) => {
  return useQuery({
    queryKey: ['workstations', page, pageSize],
    queryFn: () => execute(GET_WORKSTATIONS, { page, pageSize }),
    placeholderData: previousData => previousData,
  });
};

export const useWorkstation = (id: number) => {
  return useQuery({
    queryKey: ['workstation', id],
    queryFn: () => execute(GET_WORKSTATION, { id }),
    enabled: !!id,
  });
};

export const useCreateWorkstation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { title: string; description: string; ipAddress?: string }) =>
      execute(CREATE_WORKSTATION, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workstations'] });
    },
  });
};

export const useUpdateWorkstation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: number; title?: string; description?: string; ipAddress?: string }) =>
      execute(UPDATE_WORKSTATION, variables),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workstations'] });
      queryClient.invalidateQueries({ queryKey: ['workstation', variables.id] });
    },
  });
};

export const useDeleteWorkstation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id: number }) => execute(DELETE_WORKSTATION, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workstations'] });
    },
  });
};
