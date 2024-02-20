import { StoreApiResponse, StoreType } from "@/interface";
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'

export const useStores = (page: string | string[]) => {
    const {
        isLoading,
        isError,
        data,
    } = useQuery(["stores", page], async () => {
        const response: AxiosResponse<StoreApiResponse> = await axios(`/api/stores?page=${page}`);
        return response.data;
    });

    return {
        isLoading,
        isError,
        data,
    }
}