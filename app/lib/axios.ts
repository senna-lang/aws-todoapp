import axios from 'axios';
import { API_URL } from '@/constants/url';

export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: API_URL,
});