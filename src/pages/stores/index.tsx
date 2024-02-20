import { StoreType } from "@/interface";
import Image from "next/image";
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query'
import Loading from "@/components/Loading";
import { useStores } from "@/data/store";

const StoreListPage = () => {
    const {
        isLoading,
        isError,
        data: stores,
    } = useStores();

    if (isError) {
        return (
            <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
                다시 시도해주세요
            </div>
        );
    }


    return (
        <div className="w-full max-w-5xl m-auto mt-7" key="store-list-page">
            <ul className="divide-y divide-gray-100">
                {isLoading ?
                    (<Loading />) :
                    (stores?.map((store, index) => (
                        <li key={index} className="flex  w-full justify-between p-4">
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
        </div >
    )
}

export default StoreListPage

