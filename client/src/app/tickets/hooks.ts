import {
  assignTicket,
  completedTicket,
  createTickets,
  deleteCompletedTicket,
  getTicketDetail,
  getTickets,
  getUsers,
  unassignTicket,
} from '../../api/index';
import { useMutation, useQuery } from 'react-query';

export const useGetUsers = () => {
  const { isLoading, data, error, refetch } = useQuery({
    queryFn: getUsers,
    queryKey: ['users'],
  });

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};

export const useGetTickets = () => {
  const { isLoading, data, error, refetch } = useQuery({
    queryFn: getTickets,
    queryKey: ['tickets'],
  });

  return {
    isLoading,
    data,
    error,
    refetch,
  };
};

export const usePostTicket = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (body: { description: string }) => {
      const res = await createTickets(body);
      return res;
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export const usePutCompletedTicket = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: { id: number }) => {
      const res = await completedTicket(params);
      return res;
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export const useDeleteCompleted = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: { id: number }) => {
      const res = await deleteCompletedTicket(params);
      return res;
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export const useGetTicketDetail = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: { id: number }) => {
      const res = await getTicketDetail(params);
      return res;
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export const usePutAssignTicket = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: { id: number; userId: number }) => {
      const res = await assignTicket(params);
      return res;
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};

export const usePutUnAssignTicket = () => {
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (params: { id: number }) => {
      const res = await unassignTicket(params);
      return res;
    },
  });

  return {
    mutateAsync,
    isLoading,
  };
};
