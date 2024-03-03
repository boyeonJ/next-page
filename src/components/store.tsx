'use client'
import { currentStoreState } from "@/atom";
import Image from "next/image"
import { useRouter } from "next/navigation";
import {
    AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useRecoilState } from 'recoil';


const Store = () => {
    const [store, setStore] = useRecoilState(currentStoreState);
    const router = useRouter();

    return (
        <>
            {store && (
                <div className="fixed p-8 inset-x-0 mx-auto w-full max-w-sm md:max-w-xl bg-white bottom-20 z-10 rounded-lg shadow-lg ">

                    <div className="flex gap-2 items-center">
                        <Image
                            src={
                                store?.category
                                    ? `/images/markers/${store?.category}.png`
                                    : "/images/markers/default.png"
                            }
                            width={40}
                            height={40}
                            alt="아이콘 이미지"
                        />
                        <div>
                            <p className="font-semibold">
                                {store?.name}
                            </p>
                            <p className="text-sm">
                                {store?.category}
                            </p>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-2 items-center">
                        <HiOutlineMapPin />
                        {store?.address}
                    </div>
                    <div className="mt-2 flex gap-2 items-center">
                        <AiOutlinePhone />
                        {store?.phone}
                    </div>
                    <button
                        type="button"
                        onClick={() => router.push(`/stores/${store.id}`)}
                        className="font-semibold">
                        상세보기
                    </button>
                </div >
            )}
        </>
    )
}

export default Store;