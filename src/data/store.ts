import { StoreType } from "@/interface";
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'

export const useStores = () => {
    const {
        isLoading,
        isError,
        data,
    } = useQuery("stores", async () => {
        const response: AxiosResponse<StoreType[]> = await axios("/api/stores");
        return response.data;
    });

    return {
        isLoading,
        isError,
        data,
    }
}