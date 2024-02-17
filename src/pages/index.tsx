import Script from "next/script";
import * as stores from "@/data/store_data.json";
import { useState } from "react";
import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineCheck,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";

declare global {
  interface Window {
    kakao: any;
  }
}

const DEFAULT_LAT = 37.497625203;
const DEFAULT_LNG = 127.03088379;

export default function Home() {
  const [store, setStore] = useState<any>(null);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);
      const imageSize = new window.kakao.maps.Size(40, 45);
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      //marker
      stores['DATA'].map((store) => {
        const imageSrc = store?.bizcnd_code_nm
          ? `/images/markers/${store?.bizcnd_code_nm}.png`
          : "/images/markers/default.png";
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        const markerPosition = new window.kakao.maps.LatLng(store?.y_dnts, store?.x_cnts);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage
        });

        marker.setMap(map);

        const content = `<div class="infowindow">${store.upso_nm}</div>`;
        const overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          overlay.setMap(map);
        });
        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          overlay.setMap(null);
        });
        window.kakao.maps.event.addListener(marker, 'click', function () {
          setStore(store);
          console.log(store)
        })
      })
    })

  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>

      {store && (
        <div className="fixed p-8 inset-x-0 mx-auto w-full max-w-sm md:max-w-xl bg-white bottom-20 z-10 rounded-lg shadow-lg ">
          <div className="flex gap-2 items-center">
            <Image
              src={
                store?.bizcnd_code_nm
                  ? `/images/markers/${store?.bizcnd_code_nm}.png`
                  : "/images/markers/default.png"
              }
              width={40}
              height={40}
              alt="아이콘 이미지"
            />
            <div>
              <p className="font-semibold">
                {store?.upso_nm}
              </p>
              <p className="text-sm">
                {store?.bizcnd_code_nm}
              </p>
            </div>
          </div>


          <div className="mt-4 flex gap-2 items-center">
            <HiOutlineMapPin />
            {store?.rdn_code_nm}
          </div>

          <div className="mt-2 flex gap-2 items-center">
            <AiOutlinePhone />
            {store?.tel_no}
          </div>
        </div>
      )}
    </>
  );
}


// "tel_no": null,
// "crtfc_gbn": "19",
// "upd_time": 1688569200000,
// "cob_code_nm": "식육즉석판매가공업",
// "crtfc_class": null,
// "rdn_detail_addr": null,
// "upso_sno": null,
// "bizcnd_code_nm": "default",
// "upso_nm": "축산사랑",
// "gnt_no": null,
// "map_indict_yn": "Y",
// "y_dnts": "37.6165063",
// "cob_code": "501",
// "x_cnts": "126.932540",
// "owner_nm": "유영성",
// "bizcnd_code": "50101",
// "crtfc_ymd": "2023-07-06",
// "crt_time": 1688569200000,
// "crtfc_sno": "서울 제2023-01028호",
// "crtfc_yn": "Y",
// "rdn_addr_code": null,
// "rdn_code_nm": "서울특별시 은평구 불광로109",
// "cgg_code": "3110000",
// "cgg_code_nm": "은평구",
// "crtfc_upso_mgt_sno": 14597,
// "use_yn": "Y",
// "crtfc_gbn_nm": "우리동네 모범정육점",
// "food_menu": null