'use client'
import { StoreType } from '@/interface';
import axios from 'axios';
import { useQuery } from "react-query";
import Loader from '@/components/Loader';

export default function Page({ params }: { params: { id: string } }) {
    // const [store, setStore] = useRecoilState(currentStoreState);

    // const fetchStore = async () => {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    //         cache: 'no-cache'
    //     })

    //     if (!res.ok) {
    //         throw Error("Failed to fetch data");
    //     }
    //     return res.json();
    // }

    const fetchStore = async () => {
        const { data } = await axios(`/api/stores?id=${params.id}`);
        return data as StoreType;
    };

    const {
        data: store,
        isFetching,
        isError,
    } = useQuery<StoreType>(`storeType-${params.id}`, fetchStore, {
        enabled: !!params.id,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        return (
            <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
                다시 시도해주세요
            </div>
        );
    }

    if (isFetching) {
        return <Loader className="mt-[20%]" />;
    }

    return (

        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            카테고리
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.category}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            주소
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.address}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            위도
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.lat}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            경도
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.lng}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            연락처
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.phone}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            식품인증구분
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.foodCertifyName}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            업종명
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {store?.storeType}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}