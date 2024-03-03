'use client'
import { StoreApiResponse } from "@/interface";
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'

export const useStores = (page: string | string[], q: string) => {
    const searchParams = {
        q,
        page
    }

    const {
        isLoading,
        isError,
        data,
    } = useQuery(["stores", page], async () => {
        const response: AxiosResponse<StoreApiResponse> = await axios.get(`/api/stores?page=${page}`, { params: { ...searchParams } });
        return response.data;
    });

    return {
        isLoading,
        isError,
        data,
    }
}


// const { data } = await axios("/api/stores?page=" + pageParam, {
//     params: {
//       limit: 10,
//       page: pageParam,
//       ...searchParams,
//     },
//   });
