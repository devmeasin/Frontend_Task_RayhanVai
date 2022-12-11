import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { API_ENDPOINT } from 'config';
import {IProduct} from 'store/types';


export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_ENDPOINT + '/items/products?',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProductsData: builder.query<IProduct, string>({
            query: () => 'fields[]=id&fields[]=title&fields[]=handle&fields[]=cover_image&fields[]=price&meta=*&limit=10&page=1',
            transformResponse: (res: { data: IProduct }) => res?.data,
            // transformErrorResponse: (res : any) => res.status,
            providesTags: ['Product'],
        }),

        getSingleProductData: builder.query<IProduct , string>({
            query: (queryString) => `products?${queryString}`,
            transformResponse: (res: { data: IProduct }) => res?.data,
            // transformErrorResponse: ( response: { status: string | number } ) => response.status,
            providesTags: ['Product'],
        }),

    })
});


export const { useGetProductsDataQuery, useGetSingleProductDataQuery } = productsApi;