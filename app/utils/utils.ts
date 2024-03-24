import { instance } from '../lib/axios';

export const editTodo = async (id: number) => {
  const response = await instance.put(`/editTodo/${id}`);
  return response;
};
export const deleteTodo = async (id: number) => {
  const response = await instance.delete(`/deleteTodo/${id}`);
  return response;
};
export const toggleCompletionTodo = async (
  id: number,
  isCompleted: boolean
) => {
  const body = {
    isCompleted: !isCompleted,
  };
  const response = await instance.put(`/editTodo/${id}`, body);
  return response;
};
