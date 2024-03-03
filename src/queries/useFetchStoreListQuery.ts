import { useQuery } from 'react-query';
import { SearchParams, StoreApiResponse } from "@/interface";
import axios from 'axios';


export const useFetchStoreListQuery = (searchParams: SearchParams) => {
    return useQuery(["stores", searchParams], async () => {
        const response = await axios.get<StoreApiResponse>(`/api/stores`, { params: searchParams });
        return response.data;
    });
}