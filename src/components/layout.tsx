import Navbar from './navbar'
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default Layout;