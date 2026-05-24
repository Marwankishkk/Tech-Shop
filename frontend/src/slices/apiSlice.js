import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseUrl} from '../constants';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({}),
});

export default apiSlice;