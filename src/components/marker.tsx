'use client'

import { mapState, currentStoreState } from "@/atom";
import { StoreType } from "@/interface";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react'

const Marker = ({ stores }: { stores: StoreType[] }) => {
    const map = useRecoilValue(mapState);
    const currentStore = useRecoilValue(currentStoreState);
    const setStore = useSetRecoilState(currentStoreState);


    const setMarker = (store: StoreType) => {
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

        return marker;
    }

    const setOverlay = (marker: any, name?: string,) => {
        var content = `<div class="infowindow">${name}</div>`;
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
    }

    const setClick = (marker: any, store: StoreType) => {
        window.kakao.maps.event.addListener(marker, 'click', function () {
            setStore(store);
        })
    }

    const setMarkers = useCallback(() => {
        stores.map((store: StoreType) => {
            const marker = setMarker(store)

            marker.setMap(map);
            setOverlay(marker, store.name)
            setClick(marker, store)
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

