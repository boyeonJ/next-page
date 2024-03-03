'use client'
import Image from "next/image";
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import { useSearchParams } from 'next/navigation'
import { useFetchStoreListQuery } from "@/queries/useFetchStoreListQuery";
import { StoreType } from "@/interface";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";


const StoreListPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [q, setQ] = useState<string>('');
    const page = searchParams?.get('page') ?? '1';

    const {
        isLoading,
        isError,
        data
    } = useFetchStoreListQuery({ page, q });

    if (isError) {
        return (
            <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
                다시 시도해주세요
            </div>
        );
    }
    return (
        <div className="w-full max-w-5xl m-auto mt-7" key="store-list-page">
            <div className='flex gap-3 items-center mb-4'>
                <AiOutlineSearch className="w-6 h-6" />
                <input
                    type="search"
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="음식점 검색"
                    className="w-full bg-gray-50 p-3 rounded-lg outline-none border"
                />
            </div>

            <ul className="divide-y divide-gray-100">
                {isLoading ?
                    (<Loading />) :
                    (data?.data.map((store: StoreType, index: number) => (
                        <li key={index}
                            className="flex  w-full justify-between p-4"
                            onClick={() => router.push(`/stores/${store.id}`)}>
                            <div className="flex gap-3">
                                <Image
                                    src={store?.category
                                        ? `/images/markers/${store?.category}.png`
                                        : "/images/markers/default.png"}
                                    alt="맛집 이미지"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <div className="text-sm font-bold mb-2">
                                        {store.name}
                                    </div>
                                    <div className="text-xs">
                                        {store.storeType}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="text-sm font-semibold">{store.address}</div>
                                <div className="text-xs" >
                                    <div>{store.phone}</div>
                                </div>
                            </div>
                        </li>
                    ))
                    )
                }
            </ul>
            {data && (
                <Pagination total={data.totalPage as number} page={page as string} />
            )}
        </div >
    )
}

export default StoreListPage

