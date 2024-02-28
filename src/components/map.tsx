'use client'
import { mapState } from "@/atom";
import Script from "next/script";
import { useSetRecoilState } from 'recoil'

declare global {
    interface Window {
        kakao: any;
    }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

const Map = () => {
    const setMap = useSetRecoilState(mapState);

    const loadKakaoMap = () => {
        window.kakao.maps.load(() => {
            //map
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);

            setMap(map);
        })
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
                onReady={loadKakaoMap}
            />
            <div id="map" className="w-full h-screen"></div>
        </>
    )
}

export default Map;