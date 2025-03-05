import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsResponse } from '../types/news.types';

const API_KEY = 'vtgVpvTm159wt4bU8lucT2zdBOB0GNL5';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getNewsByMonth: builder.query<NewsResponse, { year: number; month: number }>({
      query: ({ year, month }) => `${year}/${month}.json?api-key=${API_KEY}`,
    })
  })
});

export const { useGetNewsByMonthQuery } = newsApi;
