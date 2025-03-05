import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResponse } from '../types/news.types';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getNewsByMonth: builder.query<NewsResponse, { year: number; month: number }>({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${import.meta.env.VITE_API_KEY}`,
    })
  })
});

export const { useGetNewsByMonthQuery } = newsApi;
