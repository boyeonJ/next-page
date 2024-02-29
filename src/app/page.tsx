import Map from "@/components/map";
import Marker from "@/components/marker";
import Store from "@/components/store";

async function getStores() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Home() {
    const stores = await getStores();
    console.log(stores);

    return (
        <>
            <Map />
            <Marker stores={stores} />
            <Store />
        </>
    );
}