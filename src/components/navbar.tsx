import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between shadow-sm bg-white p-4">
            <span className="text-4xl font-bold ">kakao map</span>
            <Link href="/stores" className="text-xl font-semibold">
                맛집 목록
            </Link>
        </nav >
    )
}

export default Navbar