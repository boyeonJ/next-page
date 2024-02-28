'use client'

import { mapState } from "@/atom";
import { StoreType } from "@/interface";
import { useRecoilValue } from 'recoil';
import { useCallback, useEffect } from 'react'

const Marker = ({ stores }: { stores: StoreType[] }) => {
    const map = useRecoilValue(mapState);

    const setMarkers = useCallback(() => {

        stores.map((store: StoreType) => {
            var imageSrc = store?.category
                ? `/images/markers/${store?.category}.png`
                : "/images/markers/default.png";
            const imageSize = new window.kakao.maps.Size(40, 45);
            const imageOption = { offset: new window.kakao.maps.Point(27, 69) };
            const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
            const markerPosition = new window.kakao.maps.LatLng(store?.lat, store?.lng);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage
            });

            marker.setMap(map);

            var content = `<div class="infowindow">${store?.name}</div>`;
            const overlay = new window.kakao.maps.CustomOverlay({
                content: content,
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
            // window.kakao.maps.event.addListener(marker, 'click', function () {
            //     setStore(store);
            // })
        })
    }, [map, stores]);


    useEffect(() => {
        if (map) {
            setMarkers();
        }
    }, [map]);

    return (
        <>
        </>
    )

}
export default Marker

