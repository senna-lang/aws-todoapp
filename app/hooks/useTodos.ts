import { API_URL } from '@/constants/url';
import { useCallback } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { PostFetcher } from '../types/types';
import { instance } from '../lib/axios';


const getFetcher = async (url: string) => {
  const response = await instance.get(url);
  return response.data;
};

const postFetcher: PostFetcher = async (url, { arg }) => {
  const response = await instance.post(url, arg);
  return response.data;
};

export const useTodos = () => {
  const { data, isLoading, error, mutate } = useSWR(`/allTodos`, getFetcher);

  const revalidate = useCallback(() => mutate(), [mutate]);

  const {
    trigger: listTrigger,
    isMutating,
    error: mutateError,
  } = useSWRMutation('/createTodo', postFetcher, {
    onSuccess: revalidate,
  });

  return {
    todos: data,
    isLoading,
    error,
    mutate,
    listTrigger
  };
};
