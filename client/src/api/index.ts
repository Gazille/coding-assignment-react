import axios from 'axios';

const middleware = axios.create({
  baseURL: 'http://localhost:4200/api',
});

export const getUsers = async () => {
  return await middleware.get(`/users`);
};

export const getTickets = async () => {
  return await middleware.get(`/tickets`);
};

export const getTicketDetail = async (params: { id: number }) => {
  return await middleware.get(`/tickets/${params.id}`);
};

export const createTickets = async (body: { description: string }) => {
  return await middleware.post(`/tickets`, body);
};

export const completedTicket = async (params: { id: number }) => {
  return await middleware.put(`/tickets/${params.id}/complete`);
};

export const deleteCompletedTicket = async (params: { id: number }) => {
  return await middleware.delete(`/tickets/${params.id}/complete`);
};

export const assignTicket = async (params: { id: number; userId: number }) => {
  return await middleware.put(`/tickets/${params.id}/assign/${params.userId}`);
};

export const unassignTicket = async (params: { id: number }) => {
  return await middleware.put(`/tickets/${params.id}/unassign`);
};
