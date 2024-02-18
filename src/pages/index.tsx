import Script from "next/script";
import * as stores from "@/data/store_data.json";
import Store from "@/components/store"
import { useState } from "react";
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
      <Scriptb
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}0&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>

      {store && (
        <Store store={store} />
      )}
    </>
  );
}