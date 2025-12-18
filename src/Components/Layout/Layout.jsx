import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import GlobalLoader from '../GlobalLoader/GlobalLoader'
import { useSelector } from 'react-redux'

function Layout() {
    const { isCartLoading } = useSelector(state => state.cartRed)
    return (
        <>
            {isCartLoading ? <GlobalLoader /> : null}
            <Navbar />
            <Outlet />
        </>
    )
}

export default Layout
