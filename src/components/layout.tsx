import Navbar from './navbar'
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <main className="w-screen">{children}</main>
        </div>
    )
}

export default Layout;